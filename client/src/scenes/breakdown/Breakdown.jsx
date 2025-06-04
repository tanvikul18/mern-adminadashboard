import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../Components/Header.jsx";

import { useGetSalesQuery } from "../../state/api.js";
import { BreakdownChart } from "../../Components/BreakdownChart.jsx";

const Daily = () => {

  const { data } = useGetSalesQuery();
  const theme = useTheme();

  return (
     <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Daily;