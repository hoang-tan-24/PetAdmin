import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
// components
// sections
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  AppCurrentVisits,
  AppWebsiteVisits,
  AppWidgetSummary,
} from '../sections/@dashboard/app';



// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const theme = useTheme();

  const [shopId, setShopId] = useState(0);

  const profile = JSON.parse(localStorage.getItem('profile'));

  // const DASHBOARD = useDashboard(shopId)

  const employee = JSON.parse(localStorage.getItem('employee'));
  if (employee && employee.shopId !== shopId) {
    console.log("employee co shop id la : ", employee.shopId)
    setShopId(employee.shopId)
  }

  const [openReturn, setOpenReturn] = useState(false);
  const [DASHBOARD, setDASHBOARD] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api20230626100239.azurewebsites.net/api/Dashboard?shopId=${shopId}`);
        const data = response.data;
        setDASHBOARD(data);
        setOpenReturn(true)
        console.log('get ok from ', response.config.url);
        console.log("data : ", data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (shopId !== 0)
      fetchData();
  }, [shopId]);

  const defaultIntValue = 0;
  const defaultDecimalValue = 0;
  if (!openReturn) {
    // Render loading or placeholder content while waiting for the data
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60vh',
          fontSize: '24px',
        }}
      >
        <div>Đang tải...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title> Dashboard | Minimal UI </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Xin chào {profile.name}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Số lượng đơn hàng tuần trước" total={DASHBOARD.totalOrderByLastWeek ?? defaultIntValue} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Doanh thu tuần trước (VND)" total={DASHBOARD.totalIncomeByLastWeek ?? defaultIntValue} color="info" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng Số lượng đơn hàng" total={DASHBOARD.totalOrder ?? defaultIntValue} color="warning" />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Tổng Doanh thu (VND)" total={DASHBOARD.totalIncome ?? defaultIntValue} color="error" />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Doanh thu"
              subheader="(+0%) so với năm trước"
              chartLabels={[
                '01/01/2023',
                '02/01/2023',
                '03/01/2023',
                '04/01/2023',
                '05/01/2023',
                '06/01/2023',
                '07/01/2023',
                '08/01/2023',
                '09/01/2023',
                '10/01/2023',
                '11/01/2023',
                '12/01/2023',
              ]}
              chartData={[
                // {
                //   name: "Tổng số lượng đơn hàng",
                //   type: "column",
                //   fill: "solid",
                //   data: [
                //     DASHBOARD.totalOrderByMonth1 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth2 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth3 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth4 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth5 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth6 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth7 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth8 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth9 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth10 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth11 ?? defaultIntValue,
                //     DASHBOARD.totalOrderByMonth12 ?? defaultIntValue

                //   ],
                //   // data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                // },
                {
                  name: "Doanh thu",
                  type: "area",
                  fill: "gradient",
                  data: [

                    DASHBOARD.totalIncomeByMonth1 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth2 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth3 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth4 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth5 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth6 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth7 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth8 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth9 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth10 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth11 ?? defaultDecimalValue,
                    DASHBOARD.totalIncomeByMonth12 ?? defaultDecimalValue

                  ],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Doanh thu theo danh mục"
              chartData={[
                { label: 'Thú cưng', value: DASHBOARD.totalIncomeByPet },
                { label: 'Sản phẩm', value: DASHBOARD.totalIncomeByProduct },
                { label: 'Dịch vụ', value: DASHBOARD.totalIncomeByService },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.error.main,
                theme.palette.warning.main,
              ]}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
