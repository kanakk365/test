"use client";
import DashHeader from "@/components/common/dashboard/header";
import Siderbar from "@/components/common/dashboard/sidebar";
import { COMPONENT_MAP, useDashboard } from "../hooks/dashboard";
import ComingSoon from "@/components/common/dashboard/pages/coming-soon";

export default function DashIndex() {
  const { active } = useDashboard();
  const Component =
    COMPONENT_MAP[active as keyof typeof COMPONENT_MAP] || ComingSoon;
  return (
    <div className="flex flex-col bg-white">
      <DashHeader />
      <div className="flex flex-1">
        <Siderbar />
        <Component />
      </div>
    </div>
  );
}
