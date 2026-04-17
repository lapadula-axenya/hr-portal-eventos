import crypto from "crypto";
import { NextResponse } from "next/server";
import { getSecret } from "@/lib/secretManager";
import { errorMessages } from "@/messages/errorMessages";

enum EmbedUrlErrors {
  ENVIRONMENT_NOT_SET = "LOOKER_SECRET and LOOKER_HOST environment variable must be set",
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const model = searchParams.get("model");
  const principalCompanyId = searchParams.get("principalCompanyId");
  const embedPath = searchParams.get("embedPath");
  const firstName = searchParams.get("principalFirstName");
  const principalId = searchParams.get("principalId") || crypto.randomUUID();
  const lastName = searchParams.get("principalLastName");

  if (!model || !principalCompanyId || !embedPath) {
    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 422 },
    );
  }

  const forceUnicodeEncoding = (string: string): string => {
    return decodeURIComponent(encodeURIComponent(string));
  };

  try {
    const LOOKER_HOST = process.env.LOOKER_HOST;

    const LOOKER_SECRET = await getSecret(
      process.env.SECRET_MANAGER_LOOKER_EMBED_SECRET!,
      process.env.LOOKER_EMBED_SECRET!,
    );

    if (!LOOKER_SECRET || !LOOKER_HOST) {
      return NextResponse.json(
        {
          error: EmbedUrlErrors.ENVIRONMENT_NOT_SET,
        },
        { status: 500 },
      );
    }

    const embedUrl = encodeURIComponent(embedPath);

    const LOOKER_SESSION_LENGTH = 900;
    const LOOKER_DEFAULT_GROUP_IDS = [10];

    const user_params = {
      external_user_id: principalId,
      first_name: firstName,
      last_name: lastName,
      permissions: [
        "access_data",
        "download_with_limit",
        "embed_browse_spaces",
        "see_looks",
        "see_user_dashboards",
      ],
      models: model.split(","),
      user_attributes: {
        client_id: principalCompanyId,
      },
      session_length: LOOKER_SESSION_LENGTH,
      force_logout_login: true,
      nonce: crypto.randomUUID(),
    };
    const time = Math.floor(Date.now() / 1000);
    const accessFilters = {};

    const string_to_sign = [
      LOOKER_HOST,
      `/login/embed/${embedUrl}`,
      JSON.stringify(user_params.nonce),
      JSON.stringify(time),
      JSON.stringify(user_params.session_length),
      JSON.stringify(user_params.external_user_id),
      JSON.stringify(user_params.permissions),
      JSON.stringify(user_params.models),
      JSON.stringify(LOOKER_DEFAULT_GROUP_IDS),
      JSON.stringify(user_params.user_attributes),
      JSON.stringify(accessFilters),
    ].join("\n");

    const signature = crypto
      .createHmac("sha1", LOOKER_SECRET)
      .update(forceUnicodeEncoding(string_to_sign))
      .digest("base64")
      .trim();

    const final_params = {
      permissions: JSON.stringify(user_params.permissions),
      models: JSON.stringify(user_params.models),
      signature,
      nonce: JSON.stringify(user_params.nonce),
      time: JSON.stringify(time),
      session_length: JSON.stringify(user_params.session_length),
      group_ids: JSON.stringify(LOOKER_DEFAULT_GROUP_IDS),
      external_user_id: JSON.stringify(user_params.external_user_id),
      user_attributes: JSON.stringify(user_params.user_attributes),
      access_filters: JSON.stringify(accessFilters),
      force_logout_login: JSON.stringify(user_params.force_logout_login),
    };

    const parameters = new URLSearchParams(final_params).toString();

    const final_url = `https://${LOOKER_HOST}/login/embed/${embedUrl}?${parameters}`;

    return NextResponse.json(
      {
        data: {
          embedUrl: final_url,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error creating Looker embed URL:", error);

    return NextResponse.json(
      { error: errorMessages.internalError },
      { status: 500 },
    );
  }
}
