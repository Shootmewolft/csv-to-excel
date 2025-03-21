import { useState } from "react"
import * as XLSX from "xlsx"
import Papa from "papaparse"

type CSVRow = Record<string, string | number | boolean | null | undefined>

export function useCSVConverter() {
  const [csvData, setCsvData] = useState<CSVRow[]>([])
  const [headers, setHeaders] = useState<string[]>([])
  const [selectedColumns, setSelectedColumns] = useState<string[]>([])
  const [fileName, setFileName] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const excludedColumns = ["proEmail", "premium", "profileStatus", "lastLinkedinMessageSentDate", "emailSent", "lastEmailReplyDate", "salesNavigatorId", "linkedInConversationLink", "connectedAt", "firstMessageAt", "emailReplied", "connectionRequestDate", "profilePictureUrl", "jobSeeker", "importDate", "messageSent", "lastEmailSentDate", ""];
  const handleFileUpload = (file: File) => {
    setIsLoading(true)
    setFileName(file.name.replace(/\.[^/.]+$/, ""))

    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      Papa.parse<CSVRow>(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          let data = results.data

          // Filter out excluded columns
          data = data.map((row) =>
            Object.fromEntries(
              Object.entries(row).filter(([key]) => !excludedColumns.includes(key))
            )
          )

          setCsvData(data)
          const columnHeaders = Object.keys(data[0] || {})
          setHeaders(columnHeaders)
          setSelectedColumns(columnHeaders)
          setIsLoading(false)
        },
        error: () => setIsLoading(false),
      })
    }

    reader.readAsText(file)
  }

  const toggleColumn = (column: string) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    )
  }

  const selectAllColumns = () => setSelectedColumns([...headers])
  const deselectAllColumns = () => setSelectedColumns([])
  const reset = () => {
    setCsvData([])
    setHeaders([])
    setSelectedColumns([])
    setFileName("")
  }

  const downloadAsXLSX = () => {
    if (!csvData.length || !selectedColumns.length) return

    const filteredData = csvData.map((row) =>
      selectedColumns.reduce<CSVRow>((acc, column) => {
        acc[column] = row[column]
        return acc
      }, {})
    )

    const workbook = XLSX.utils.book_new()
    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    XLSX.utils.book_append_sheet(workbook, worksheet, "Filtered Data")
    XLSX.writeFile(workbook, `${fileName || "filtered-data"}.xlsx`)
  }

  return {
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
  }
}
