 import React, { use, useState } from 'react'
import {Box,Card,CardActions,CardContent, Collapse,Button,Typography,Rating,useTheme,useMediaQuery} from "@mui/material"
import { useGetProductsQuery } from '../../state/api.js'
import Header from "../../Components/Header.jsx"

const Products = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
})=>{
    const theme= useTheme();
    const[isExpanded,setisExpanded] = useState();
    return(
        <Card sx={{backgroundImage : "none",backgroundColor : theme.palette.background.alt,borderRadius:"0.55rem"}}>
             <CardContent>
                <Typography sx={{fontSize : 14 }} color={theme.palette.secondary[700]} gutterBottom>
                     {category}
                </Typography>
                 <Typography variant='h5' component="div">
                     {name}
                </Typography>
                 <Typography sx={{mb : "1.5rem" }} color={theme.palette.secondary[700]}>
                     ${(Number(price).toFixed(2))}
                </Typography>
                <Rating value={rating}readOnly></Rating>
                  <Typography variant='body2'>
                     {description}
                </Typography>
             </CardContent>
             <CardActions>
                <Button variant='primary' size='small' onClick={()=>setisExpanded(!isExpanded)}>
                   See More
                </Button>
             </CardActions>
             <Collapse in ={isExpanded} timeout="auto" unmountOnExit sx={{color:theme.palette.neutral[300]}}>
                  <CardContent>
                     <Typography>id: {_id}</Typography>
                    <Typography>Supply Left: {supply}</Typography>
                    <Typography>Yearly Sales this Year: {stat.yearlySalesTotal}</Typography>
                    <Typography>Yearly Units sold this Year: {stat.yearlyTotalSoldUnits}</Typography>
                   
                </CardContent>
             </Collapse>
        </Card>
    )
}

export default function Product() {
    const {data,isLoading} = useGetProductsQuery();
    console.log("ProductData",data)
    const isNoMobile = useMediaQuery("(min-width:1000px)")
  return <Box m="1.5rem 2.5rem">
    <Header title = "PRODUCTS" subtitle= "See your list of products"/>
    {
        data || !isLoading ?(<Box mt="20px" display="grid" gridTemplateColumns="repeat(4,minmax(0,1fr))" justifyContent="space-between" rowGap="20px" columnGap="1.33%" sx={{"& > div" : {gridColumn :isNoMobile ? undefined : "span 4"}}}>
        {data.map(({
            _id,
            name,
            description,
            price,
            rating,
            category,
            supply,
            stat
            })=>(
                <Products key={_id} _id = {_id}
            name = {name}
            description = {description}
            price = {price}
            rating = {rating}
            category = {category}
            supply={supply}
            stat = {stat}/>
            ))}

        </Box>) : (<>..Loading</>)
    }
    <div></div>
  </Box>
}
