"use client";

import { useState } from "react";
import { Stack, Typography } from "@mui/material";
import { CenterContainer, PageContainer, SideModal } from "@/components";
import { usePolicicesQuery } from "@/queries/usePoliciesQuery";
import { usePolicyQuery } from "@/queries/usePolicyQuery";
import { PolicyStatus } from "@/services/policyService";
import { MainPoliciesModal } from "./_components/MainPoliciesModal";
import { MainPoliciesSectionCard } from "./_components/MainPoliciesSectionCard";

export default function MainDashboardsPage() {
  const [selectedPolicyId, setSelectedPolicyId] = useState("");

  const { isPolicyEmpty, isPolicyLoading, policy } =
    usePolicyQuery(selectedPolicyId);

  const activePoliciesQuery = usePolicicesQuery();
  const inactivePoliciesQuery = usePolicicesQuery({
    params: { "filter.isActive": "false" },
  });

  const isPoliciesEmpty =
    activePoliciesQuery.isPoliciesEmpty &&
    inactivePoliciesQuery.isPoliciesEmpty;

  const isPoliciesLoading =
    activePoliciesQuery.isPoliciesLoading ||
    inactivePoliciesQuery.isPoliciesLoading;

  const activePolicies = activePoliciesQuery.policies;

  const inactivePolicies = inactivePoliciesQuery.policies;

  const handleCloseModal = () => setSelectedPolicyId("");

  return (
    <PageContainer title="Apólices" isLoading={isPoliciesLoading}>
      {isPoliciesEmpty && (
        <CenterContainer>
          <Typography variant="subtitle1">
            Nenhum apólice encontrada.
          </Typography>
        </CenterContainer>
      )}

      <SideModal
        open={!!selectedPolicyId}
        onClose={handleCloseModal}
        isLoading={isPolicyLoading}
        isEmpty={isPolicyEmpty}
      >
        {policy && <MainPoliciesModal policy={policy} />}
      </SideModal>

      {!isPoliciesEmpty && (
        <Stack spacing="54px">
          <MainPoliciesSectionCard
            policies={activePolicies}
            status={PolicyStatus.ACTIVE}
            selectedPolicyId={selectedPolicyId}
            onChangeSelectedPolicyId={setSelectedPolicyId}
          />
          <MainPoliciesSectionCard
            policies={inactivePolicies}
            status={PolicyStatus.INACTIVE}
            selectedPolicyId={selectedPolicyId}
            onChangeSelectedPolicyId={setSelectedPolicyId}
          />
        </Stack>
      )}
    </PageContainer>
  );
}
