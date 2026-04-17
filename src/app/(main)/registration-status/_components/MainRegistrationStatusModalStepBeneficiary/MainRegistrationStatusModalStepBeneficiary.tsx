import {
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  StackProps,
  Typography,
  TypographyProps,
} from "@mui/material";
import { plural } from "@umatch/pluralize-ptbr";
import {
  ChevronRightIcon,
  FileTextIcon,
  LucideIcon,
  PhoneIcon,
} from "lucide-react";
import { BenefitTypeIcon, LoadingContainer } from "@/components";
import { useBeneficiaryParamsContext } from "@/contexts/BeneficiaryParamsContext";
import {
  BeneficiaryStatus,
  BeneficiaryStatusTranslate,
  BeneficiaryType,
  BeneficiaryTypeTranslate,
  GenderTranslate,
} from "@/services/beneficiaryService";
import { BenefitStatus, BenefitTypeTranslate } from "@/services/benefitService";
import { fallbackMessage } from "@/utils/fallbackMessage";
import { formatDate } from "@/utils/formatDate";
import { maskCnpj } from "@/utils/maskCnpj";
import { maskCpf } from "@/utils/maskCpf";
import { maskPhone } from "@/utils/maskPhone";
import { smartNameCase } from "@/utils/smartNameCase";
import { MainRegistrationStatusModalStepBeneficiaryProps } from ".";

const cardIcon: StackProps<LucideIcon> = {
  size: 16,
  marginTop: "3px",
};

const cardStyles: StackProps = {
  component: Card,
  borderRadius: "8px",
  bgcolor: "grey.900",
  color: "grey.300",
  divider: <Divider />,
};

const cardContentStyles: StackProps = {
  direction: "row",
  padding: "10px 13px !important",
  component: CardContent,
};

const cardTitleStyles: TypographyProps = {
  variant: "body2",
  color: "grey.300",
  fontWeight: 700,
  margin: "0 0 8px 15px",
};

export function MainRegistrationStatusModalStepBeneficiary({
  beneficiary,
  dependents,
  isDependentsLoading,
}: MainRegistrationStatusModalStepBeneficiaryProps) {
  const { setModalBeneficiaryId, setModalBenefitId } =
    useBeneficiaryParamsContext();

  const isHolder = beneficiary.type === BeneficiaryType.HOLDER;

  const titleBenefits = plural("Benefício", beneficiary?.benefits?.length);
  const titleDependents = plural("Dependente", dependents?.length);

  return (
    <Stack spacing="32px">
      <Stack color="grey.300">
        <Typography variant="subtitle1" fontWeight={700} color="white">
          {smartNameCase(beneficiary.name)}
        </Typography>
        <Typography>
          {fallbackMessage(BeneficiaryTypeTranslate[beneficiary?.type])}
        </Typography>
        <Typography>
          Matrícula: {fallbackMessage(beneficiary?.enrollmentNumber)}
        </Typography>
        <Typography>
          CPF: {fallbackMessage(maskCpf(beneficiary?.document))}
        </Typography>
      </Stack>

      <Stack {...cardStyles}>
        <Stack {...cardContentStyles}>
          <Stack component={PhoneIcon} {...cardIcon} />
          <Typography variant="body2">
            {fallbackMessage(maskPhone(beneficiary?.phone))}
          </Typography>
        </Stack>

        <Stack {...cardContentStyles}>
          <Stack component={FileTextIcon} {...cardIcon} />
          <Typography variant="body2">
            Data Nascimento:{" "}
            {fallbackMessage(formatDate(beneficiary?.birthday))}
          </Typography>
          <Typography variant="body2">({beneficiary?.age} anos)</Typography>
        </Stack>

        <Stack {...cardContentStyles}>
          <Stack component={FileTextIcon} {...cardIcon} />
          <Typography variant="body2">
            Sexo: {fallbackMessage(GenderTranslate[beneficiary?.gender])}
          </Typography>
        </Stack>

        <Stack {...cardContentStyles}>
          <Stack component={FileTextIcon} {...cardIcon} />
          <Typography variant="body2">
            Estado Civil: {fallbackMessage(beneficiary?.maritalStatus)}
          </Typography>
        </Stack>

        <Stack {...cardContentStyles}>
          <Stack component={FileTextIcon} {...cardIcon} />
          <Typography variant="body2">
            Status:{" "}
            <Typography
              {...(beneficiary.status === BeneficiaryStatus.ACTIVE && {
                color: "primary.main",
              })}
              variant="body2"
              component="span"
              fontWeight={700}
            >
              {fallbackMessage(BeneficiaryStatusTranslate[beneficiary?.status])}
            </Typography>
          </Typography>
        </Stack>
      </Stack>

      <Stack>
        <Typography {...cardTitleStyles}>{titleBenefits}</Typography>

        <Stack {...cardStyles}>
          {!beneficiary.benefits?.length && (
            <Stack {...cardContentStyles}>
              <Typography>Nenhum benefício ativo</Typography>
            </Stack>
          )}

          {!!beneficiary.benefits?.length &&
            beneficiary.benefits.map((benefit) => {
              const translatedType = benefit.type
                ? BenefitTypeTranslate[benefit.type]
                : "";
              const isInactive = benefit.status === BenefitStatus.INACTIVE;
              const color = isInactive ? "grey.300" : "white";

              return (
                <CardActionArea
                  key={benefit?.id}
                  onClick={() => setModalBenefitId(benefit?.id ?? "")}
                >
                  <Stack {...cardContentStyles}>
                    {benefit?.type && (
                      <BenefitTypeIcon
                        type={benefit.type}
                        size={16}
                        style={{ marginTop: "3px" }}
                      />
                    )}

                    <Stack>
                      <Typography variant="body2" color={color}>
                        {translatedType}{" "}
                        {isInactive && (
                          <Typography component="span" variant="body2">
                            (Inativo)
                          </Typography>
                        )}
                      </Typography>
                    </Stack>

                    <Stack
                      component={ChevronRightIcon}
                      margin="auto 0 auto auto"
                    />
                  </Stack>
                </CardActionArea>
              );
            })}
        </Stack>
      </Stack>

      {isDependentsLoading && <LoadingContainer />}

      {isHolder && !!dependents?.length && (
        <Stack>
          <Typography {...cardTitleStyles}>{titleDependents}</Typography>

          <Stack {...cardStyles}>
            {dependents.map((dependent) => (
              <CardActionArea
                key={dependent?.bid}
                onClick={() => setModalBeneficiaryId(dependent?.bid ?? "")}
              >
                <Stack {...cardContentStyles}>
                  <Typography variant="body2" color="white">
                    {smartNameCase(dependent?.name)}
                  </Typography>
                  <Stack
                    component={ChevronRightIcon}
                    margin="auto 0 auto auto"
                  />
                </Stack>
              </CardActionArea>
            ))}
          </Stack>
        </Stack>
      )}

      {isHolder && (
        <Stack>
          <Typography {...cardTitleStyles}>Dados Profissionais</Typography>

          <Stack {...cardStyles}>
            <Stack {...cardContentStyles}>
              <Stack component={FileTextIcon} {...cardIcon} />
              <Typography variant="body2">
                Data de admissão:{" "}
                {fallbackMessage(formatDate(beneficiary?.admissionDate))}
              </Typography>
            </Stack>
            <Stack {...cardContentStyles}>
              <Stack component={FileTextIcon} {...cardIcon} />
              <Stack>
                <Typography variant="body2">
                  {fallbackMessage(smartNameCase(beneficiary?.company?.name))}
                </Typography>
                <Typography variant="body2">
                  CNPJ:{" "}
                  {fallbackMessage(maskCnpj(beneficiary?.company?.document))}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}

      {!isHolder && !!beneficiary?.holder && (
        <Stack>
          <Typography {...cardTitleStyles}>Titular</Typography>

          <Stack {...cardStyles}>
            <CardActionArea
              onClick={() =>
                setModalBeneficiaryId(beneficiary?.holder?.bid ?? "")
              }
            >
              <Stack {...cardContentStyles}>
                <Typography variant="body2" color="white">
                  {fallbackMessage(smartNameCase(beneficiary?.holder?.name))}
                </Typography>
                <Stack component={ChevronRightIcon} margin="auto 0 auto auto" />
              </Stack>
            </CardActionArea>
          </Stack>
        </Stack>
      )}

      {!isHolder && (
        <Stack>
          <Typography {...cardTitleStyles}>
            Dados filiação com titular
          </Typography>

          <Stack {...cardStyles}>
            <Stack {...cardContentStyles}>
              <Stack component={FileTextIcon} {...cardIcon} />
              <Typography variant="body2">
                Relação com titular:{" "}
                {fallbackMessage(beneficiary?.relationshipWithHolder)}
              </Typography>
            </Stack>
            <Stack {...cardContentStyles}>
              <Stack component={FileTextIcon} {...cardIcon} />
              <Stack>
                <Typography variant="body2">
                  {fallbackMessage(smartNameCase(beneficiary?.company?.name))}
                </Typography>
                <Typography variant="body2">
                  CNPJ:{" "}
                  {fallbackMessage(maskCnpj(beneficiary?.company?.document))}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
