"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download } from "lucide-react"
import { useCSVConverter } from "@/hooks/useCSVConverter"
import { CSVUploadDropzone } from "@/components/CSVUploadDropzone"
import { ColumnSelector } from "@/components/ColumnSelector"

export default function CSVToXLSXConverter() {
  const {
    csvData,
    headers,
    selectedColumns,
    isLoading,
    handleFileUpload,
    toggleColumn,
    selectAllColumns,
    deselectAllColumns,
    downloadAsXLSX,
    reset,
  } = useCSVConverter()
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>CSV a XLSX Converter</CardTitle>
          <CardDescription>
            Sube un archivo CSV, selecciona las columnas que deseas conservar y descarga como XLSX.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!csvData.length ? (
            <CSVUploadDropzone onFileSelect={handleFileUpload} />
          ) : (
            <>
              {isLoading && <h2>Cargando...</h2>}
              <ColumnSelector
                headers={headers}
                selected={selectedColumns}
                onToggle={toggleColumn}
                onSelectAll={selectAllColumns}
                onDeselectAll={deselectAllColumns}
                totalRows={csvData.length}
              />
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={reset} disabled={!csvData.length}>
            Limpiar
          </Button>
          <Button
            onClick={downloadAsXLSX}
            disabled={!csvData.length || !selectedColumns.length}
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Descargar XLSX
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
