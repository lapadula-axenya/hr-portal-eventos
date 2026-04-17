import {
  ButtonBase,
  MenuItem,
  Select,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChevronDownIcon } from "lucide-react";
import {
  ActionMenu,
  usePageHeader,
  BaseModal,
  DetailItem,
  CenterContainer,
  pageHeaderMenuButtonStyles,
  pageHeaderMenuButtonIconStyles,
  pageHeaderUserNameStyles,
  pageHeaderLabelStyles,
  pageHeaderCenterContainerStyles,
  pageHeaderUserCompanyNameStyles,
  pageHeaderUserNameSkeletonStyles,
  pageHeaderUserCompanySkeletonNameStyles,
  EllipsisText,
  LoadingContainer,
  pageHeaderContainerStyles,
  PageHeaderNotification,
  usePageLayout,
} from "@/components";
import { PrincipalType } from "@/services/principalService";
import { getPrincipalEmail } from "@/utils/getPrincipalEmail";
import { getPrincipalRoleLabel } from "@/utils/getPrincipalRoleLabel";
import { smartNameCase } from "@/utils/smartNameCase";

export function PageHeader() {
  const {
    anchorEl,
    companies,
    handleClick,
    handleClose,
    isLoadingPrincipal,
    isOpenUserDetailsModal,
    menuItems,
    open,
    principal,
    selectedCompanyId,
    setIsOpenUserDetailsModal,
    setSelectedCompany,
  } = usePageHeader();

  const isKam = principal?.type === PrincipalType.KAM;

  const { isDashboardOnly } = usePageLayout();

  const companyName = smartNameCase(
    isKam
      ? (companies.find((c) => c.id === selectedCompanyId)?.name ?? "")
      : (principal?.company.name ?? ""),
  );

  return (
    <Stack {...pageHeaderContainerStyles}>
      {!isDashboardOnly && <PageHeaderNotification />}

      <ButtonBase
        {...pageHeaderMenuButtonStyles}
        onClick={handleClick}
        disabled={isLoadingPrincipal}
      >
        <Stack {...pageHeaderLabelStyles}>
          {principal && (
            <>
              <Typography {...pageHeaderUserNameStyles}>
                {smartNameCase(principal?.fullName ?? "")}
              </Typography>
              <Tooltip title={companyName}>
                <EllipsisText
                  {...pageHeaderUserCompanyNameStyles}
                  maxWidth="150px"
                >
                  {companyName}
                </EllipsisText>
              </Tooltip>
            </>
          )}
          {!principal && (
            <>
              <Skeleton {...pageHeaderUserNameSkeletonStyles} />
              <Skeleton {...pageHeaderUserCompanySkeletonNameStyles} />
            </>
          )}
        </Stack>

        <ChevronDownIcon {...pageHeaderMenuButtonIconStyles} />
      </ButtonBase>

      <ActionMenu
        open={open}
        anchorEl={anchorEl}
        menuItems={menuItems}
        onClose={handleClose}
      />

      <BaseModal
        title="Informações do Perfil"
        open={isOpenUserDetailsModal}
        onClose={() => setIsOpenUserDetailsModal(false)}
      >
        {isLoadingPrincipal && (
          <LoadingContainer {...pageHeaderCenterContainerStyles} />
        )}

        {!principal && !isLoadingPrincipal && (
          <CenterContainer {...pageHeaderCenterContainerStyles}>
            <Typography>
              Não foi possível carregar as informações do perfil.
            </Typography>
            <Typography>Tente novamente mais tarde.</Typography>
          </CenterContainer>
        )}

        {!!principal && !isLoadingPrincipal && (
          <Stack spacing="30px">
            <DetailItem label="Nome" value={principal.firstName} />
            <DetailItem label="Sobrenome" value={principal.lastName} />
            {isKam ? (
              <Stack maxWidth="300px">
                <Typography variant="body2" color="grey.100">
                  Empresa
                </Typography>
                <Select
                  value={selectedCompanyId ?? ""}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  variant="standard"
                  size="small"
                  disableUnderline
                  IconComponent={() => null}
                  renderValue={(value) => (
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      padding="0 4px 0 8px"
                      gap={0.5}
                    >
                      <EllipsisText
                        variant="caption"
                        color="grey.100"
                        maxWidth="150px"
                      >
                        {smartNameCase(
                          companies.find((c) => c.id === value)?.name ?? "",
                        )}
                      </EllipsisText>
                      <ChevronDownIcon size={10} />
                    </Stack>
                  )}
                  sx={{
                    ...pageHeaderUserCompanyNameStyles,
                    minWidth: 100,
                    height: "17px",
                    "& .MuiSelect-select": {
                      fontSize: "0.75rem",
                      padding: 0,
                      paddingRight: "0 !important",
                      height: "1rem !important",
                      lineHeight: "1rem",
                    },
                    "&:before": { display: "none" },
                    "&:after": { display: "none" },
                    "&.Mui-focused": { outline: "none" },
                    "&.Mui-focused:after": { display: "none" },
                  }}
                >
                  {companies.map((company) => (
                    <MenuItem key={company.id} value={company.id}>
                      <Typography variant="body2">
                        {smartNameCase(company.name)}
                      </Typography>
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            ) : (
              <DetailItem label="Empresa" value={principal.company.name} />
            )}
            <DetailItem
              label="E-mail corporativo"
              value={getPrincipalEmail(principal)}
            />
            <DetailItem
              label="Tipo de acesso"
              value={getPrincipalRoleLabel(principal)}
            />
          </Stack>
        )}
      </BaseModal>
    </Stack>
  );
}
