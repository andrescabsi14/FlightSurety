import React from "react";
import "./Table.scss";

const Table: React.FC<{
  cols: any;
  data: any;
  actionTitle: string;
  onClickHandler: Function;
}> = ({ onClickHandler, cols, data, actionTitle }) => {
  const renderByIndex = (obj: any, index: number) => {
    return obj[Object.keys(obj)[index]];
  };

  return (
    <div className="Table-wrapper">
      <div className="Table-header">
        {cols.map((col: string, index: number) => (
          <div key={index} className="Table-header-col">
            {col}
          </div>
        ))}
      </div>

      <div className="Table-rows">
        {data.map((item: any, topIdx: number) => (
          <div key={renderByIndex(item, 0)} className="Table-row-container">
            {Object.keys(item).map((rowItem: any, index: number) => (
              <div key={index} className="Table-row">
                {renderByIndex(item, index)}
              </div>
            ))}
            <div
              className="Table-row buy"
              onClick={() => onClickHandler(renderByIndex(item, 0))}
            >
              {actionTitle}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
