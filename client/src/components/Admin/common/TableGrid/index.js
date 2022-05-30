import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react'

import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'

const TableGrid = (props) => {
  const { rowDataRef = [], columnDataRef = [] } = props

  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
    }),
    []
  )

  return (
    <div className="ag-theme-alpine" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowDataRef}
        columnDefs={columnDataRef}
        defaultColDef={defaultColDef}
        suppressRowClickSelection={true}
        groupSelectsChildren={true}
        rowSelection={'multiple'}
        enableRangeSelection={true}
        pagination={true}
      ></AgGridReact>
    </div>
  )
}

export default TableGrid
