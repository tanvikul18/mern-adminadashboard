 import React, { use, useState } from 'react'
import {Box,Card,CardActions,CardContent, Collapse,Button,Typography,Rating,useTheme,useMediaQuery, collapseClasses} from "@mui/material"
import {useGetGeographyQuery } from '../../state/api.js'
import Header from "../../Components/Header.jsx"
import { ResponsiveChoropleth } from '@nivo/geo'
import { geoData } from '../../state/geoData.js'

export default function Geography() {
    const theme= useTheme();
    const {data,isLoading} = useGetGeographyQuery();
    console.log(data)
    const isNoMobile = useMediaQuery("(min-width:1000px)");
 
  return <Box m="1.5rem 2.5rem">
            <Header title = "GEOGRAPHY" subtitle= "Find where your users are located."/>
            <Box mt="40px" height="75vh" border={`1px solid ${theme.palette.secondary[200]}`} borderRadius="4px">
                     {
                        data ? ( <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: theme.palette.secondary[200],
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: theme.palette.background.alt,
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />) : <>Loading...</>
                     } 
            </Box>
  </Box>
}

