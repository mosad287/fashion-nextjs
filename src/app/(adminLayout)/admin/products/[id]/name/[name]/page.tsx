import AdminProductDetails from "@/components/admin/AdminProductDetails";
import React from "react";

type Props = {
  params: Promise<{
    id: string;
    name: string;
  }>;
};

async function AdminProductDetailsPage({ params }: Props) {
  const { id } = await params;

  return <AdminProductDetails id={id} />;
}

export default AdminProductDetailsPage;
