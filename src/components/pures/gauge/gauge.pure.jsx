import React from "react";
import { ArcGauge, CircularGauge } from "@progress/kendo-react-gauges";

/**
 * Componente puro para mostrar un gauge tipo Arc o Circular con el valor centrado.
 * Props:
 *  - value: valor actual
 *  - max: valor máximo
 *  - type: "arc" (por defecto) o "circular"
 *  - ...rest: otras props para el gauge
 */
const GaugePure = ({ value = 0, max = 100, type = "arc", ...rest }) => {
  const percent = max > 0 ? Math.round((value / max) * 100) : 0;
  if (type === "circular") {
    return (
      <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <CircularGauge
          value={percent}
          min={0}
          max={100}
          scale={{
            min: 0,
            max: 100,
            majorUnit: 20,
            minorUnit: 5,
            labels: { visible: false },
            startAngle: 0,
            endAngle: 360,
          }}
          colors={[{
            to: 100,       // Hasta el 100% del rango
            color: "#3366FF" // Color azul
          }]}
          style={{ width: 180, height: 180 }}
          {...rest}
        />
        <div className="gauge-center-text" style={{ top: 75 }}>{percent}%</div>
      </div>
    );
  }
  return (
    <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ArcGauge
        value={percent}
        min={0}
        max={100}
        colors={[{
          to: 100,       // Hasta el 100% del rango
          color: "#3366FF" // Color azul
        }]}
        style={{ width: 180, height: 180 }}
        {...rest} />
      <div className="gauge-center-text" style={{ top: 75 }}>{percent}%</div>
    </div>
  );
};

export default GaugePure; 