import { Chart, ChartSeries, ChartSeriesItem, ChartCategoryAxis, ChartCategoryAxisItem, ChartValueAxis, ChartValueAxisItem, ChartLegend } from "@progress/kendo-react-charts";
import { GaugePure } from '../../pures';
import './main.css'

const MainView = (props) => {
  const {
    weekDays,
    clientesSemana,
    gaugeMax,
    ventasMes,
    ordenesPendientes,
    lineSeries
  } = props;

  return (
    <div className="main-view">
      <div className="p-6 space-y-8">
        <div className="header-row">
          <h1>Bienvenido</h1>
        </div>
        <div className="gauge-container">
          <div className="flex flex-col items-center">
            <h3 className="gauge-label">Total de clientes</h3>
            <GaugePure
              value={clientesSemana}
              max={gaugeMax.clientes}
              type="circular"
              startAngle={0}
              endAngle={360}
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="gauge-label">Ventas del mes/año</h3>
            <GaugePure
              value={ventasMes}
              max={gaugeMax.ventas}
            />
          </div>
          <div className="flex flex-col items-center">
            <h3 className="gauge-label">Órdenes pendientes</h3>
            <GaugePure
              value={ordenesPendientes.pendientes}
              max={gaugeMax.pendientes}
              type="circular"
              startAngle={0}
              endAngle={360}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Productos más vendidos</h3>
          <Chart style={{ height: 320, width: '100%' }}>
            <ChartCategoryAxis>
              <ChartCategoryAxisItem categories={weekDays} majorGridLines={{ visible: false }} />
            </ChartCategoryAxis>
            <ChartValueAxis>
              <ChartValueAxisItem min={0} majorGridLines={{ visible: true, color: '#E0E0E0', width: 0.5 }} />
            </ChartValueAxis>
            <ChartSeries>
              {lineSeries.map((serie, idx) => (
                <ChartSeriesItem key={serie.name} name={serie.name} type="line" data={serie.data} />
              ))}
            </ChartSeries>
            <ChartLegend position="right" orientation="vertical" /> {/* Changed position and orientation */}
          </Chart>
        </div>
      </div>
    </div>
  );
}

export default MainView;