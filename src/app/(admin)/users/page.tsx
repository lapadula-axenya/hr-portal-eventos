"use client";

import { Chip, Stack, Typography } from "@mui/material";
import { InputDebounce, PageContainer, PageTable } from "@/components";
import { usePrincipalParamsContext } from "@/contexts/PrincipalParamsContext";
import { usePrincipalsQuery } from "@/queries/usePrincipalsQuery";
import {
  PrincipalStatusTranslate,
  PrincipalType,
} from "@/services/principalService";
import { getSearchResultMessage } from "@/utils/getSearchResultMessage";
import { isCurrentUserPrincipal } from "@/utils/isCurrentUserPrincipal";
import { AdminUsersActions } from "./_components/AdminUsersActions";
import { AdminUsersAddButton } from "./_components/AdminUsersAddButton";
import { AdminUsersAddDashboard } from "./_components/AdminUsersAddDashboard";
import { AdminUsersRole } from "./_components/AdminUsersRole";

export default function AdminUsersPage() {
  const { changePage, page, principalParams, search, setSearch } =
    usePrincipalParamsContext();

  const { isPrincipalsEmpty, isPrincipalsLoading, principals, principalsMeta } =
    usePrincipalsQuery({
      params: principalParams,
    });

  const searchResultMessage = getSearchResultMessage(
    principalsMeta?.totalItems,
    "usuário",
  );

  return (
    <PageContainer
      title="Gestão de Permissões"
      headerSlot={
        <>
          <InputDebounce
            disabled={isPrincipalsLoading}
            onDebounce={setSearch}
            placeholder="Buscar nome ou e-mail"
          />
          <AdminUsersAddButton disabled={isPrincipalsLoading} />
        </>
      }
    >
      <PageTable
        items={principals}
        isLoading={isPrincipalsLoading}
        isEmpty={isPrincipalsEmpty}
        textEmptyState="Nenhum usuário encontrado."
        hasSearch={!!search}
        searchResultMessage={searchResultMessage}
        pagination={{ page, changePage }}
        meta={principalsMeta}
        renderRow={(principal) => [
          {
            title: "Usuário",
            width: "25%",
            content: (
              <Stack spacing="4px">
                <Stack direction="row" spacing="22px">
                  <Typography variant="caption" color="white">
                    {principal?.fullName ?? "-"}
                  </Typography>
                  {isCurrentUserPrincipal(principal) && <Chip label="VOCÊ" />}
                  {principal?.type === PrincipalType.KAM && (
                    <Chip label="KAM" color="primary" size="small" />
                  )}
                </Stack>
                <Typography variant="caption" color="grey.300">
                  {principal?.channel[0].email}
                </Typography>
              </Stack>
            ),
          },
          {
            title: "Tipo de permissão",
            width: "20%",
            content: (
              <>
                {principal?.roles[0]?.name &&
                  principal.type !== PrincipalType.KAM && (
                    <AdminUsersRole principal={principal} />
                  )}
                {principal?.roles[0]?.name &&
                  principal.type === PrincipalType.KAM && (
                    <Stack padding="14px">
                      <Typography variant="body2">
                        {principal.roles[0].name}
                      </Typography>
                    </Stack>
                  )}
                {!principal?.roles[0]?.name && <Stack padding="14px">-</Stack>}
              </>
            ),
          },
          {
            title: "Status",
            titleAlign: "center",
            width: "15%",
            content: (
              <Typography
                variant="body2"
                textTransform="capitalize"
                textAlign="center"
              >
                {principal?.status
                  ? PrincipalStatusTranslate[principal?.status]
                  : "-"}
              </Typography>
            ),
          },
          {
            title: "Acesso aos dashboards",
            titleAlign: "center",
            width: "20%",
            content: (
              <Typography
                variant="body2"
                textTransform="capitalize"
                textAlign="center"
              >
                {principal?.hasDashboardAccess ? "Sim" : "Não"}
              </Typography>
            ),
          },
          {
            title: "Gerenciar dashboards",
            titleAlign: "center",
            width: "20%",
            content: principal ? (
              <AdminUsersAddDashboard principal={principal} />
            ) : (
              "-"
            ),
          },
          {
            title: "Ações",
            hideTitle: true,
            width: "75px",
            content: <AdminUsersActions principal={principal} />,
          },
        ]}
      />
    </PageContainer>
  );
}
