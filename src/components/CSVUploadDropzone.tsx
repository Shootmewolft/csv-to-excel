import { Upload, FileUp } from "lucide-react"
import { Label } from "@/components/ui/label"

interface CSVUploadDropzoneProps {
  onFileSelect: (file: File) => void
}

export const CSVUploadDropzone: React.FC<CSVUploadDropzoneProps> = ({ onFileSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
      <Upload className="h-10 w-10 text-gray-400 mb-4" />
      <p className="text-sm text-gray-500 mb-4">
        Haz clic para seleccionar un archivo CSV o arrastra y suelta aquí
      </p>
      <Label
        htmlFor="file-upload"
        className="cursor-pointer inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        <FileUp className="mr-2 h-4 w-4" />
        Seleccionar archivo
      </Label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFileSelect(file)
        }}
        className="hidden"
      />
    </div>
  )
}
