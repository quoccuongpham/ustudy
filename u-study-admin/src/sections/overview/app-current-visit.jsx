import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { styled, useTheme } from '@mui/material/styles';

import { fNumber } from 'src/utils/format-number';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

const CHART_HEIGHT = 400;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    borderTop: `dashed 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

/**
 *
 * AppCurrentVisits
 *
 */

export default function AppCurrentVisits({ title, subheader, chart, ...other }) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  // series value
  const chartSeries = series.map((i) => i.value);

  // options config for chart
  const chartOptions = useChart({
    // sparkline enable
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    // pie chart colors
    colors,
    // pie chart labels
    labels: series.map((i) => i.label),
    // border color
    stroke: {
      colors: [theme.palette.background.paper],
    },
    // floating legend
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    // show value on pie chart
    dataLabels: {
      enabled: true,
      // disable drop shadow
      dropShadow: {
        enabled: false,
      },
    },
    // tooltip customization
    tooltip: {
      // disable filling series color
      fillSeriesColor: false,
      // custom format number
      y: {
        formatter: (value) => fNumber(value),
        // custom label
        title: {
          formatter: (seriesName) => `${seriesName}`,
        },
      },
    },
    // donut style
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
    // merge options
    ...options,
  });

  return (
    <Card {...other}>
      {/* card header */}
      <CardHeader title={title} subheader={subheader} sx={{ mb: 5 }} />

      {/* chart */}
      <StyledChart
        dir="ltr"
        type="pie"
        series={chartSeries}
        options={chartOptions}
        width="100%"
        height={280}
      />
    </Card>
  );
}

AppCurrentVisits.propTypes = {
  chart: PropTypes.object,
  subheader: PropTypes.string,
  title: PropTypes.string,
};
