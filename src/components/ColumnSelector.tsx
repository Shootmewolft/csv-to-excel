import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface ColumnSelectorProps {
  headers: string[]
  selected: string[]
  onToggle: (col: string) => void
  onSelectAll: () => void
  onDeselectAll: () => void
  totalRows: number
}

export const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  headers,
  selected,
  onToggle,
  onSelectAll,
  onDeselectAll,
  totalRows,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-lg font-medium">Selecciona las columnas a conservar</h3>
      <div className="space-x-2">
        <Button variant="outline" size="sm" onClick={onSelectAll}>
          Seleccionar todo
        </Button>
        <Button variant="outline" size="sm" onClick={onDeselectAll}>
          Deseleccionar todo
        </Button>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {headers.map((header) => (
        <div key={header} className="flex items-center space-x-2">
          <Checkbox
            id={`column-${header}`}
            checked={selected.includes(header)}
            onCheckedChange={() => onToggle(header)}
          />
          <Label htmlFor={`column-${header}`} className="truncate">
            {header}
          </Label>
        </div>
      ))}
    </div>
    <div className="mt-6">
      <p className="text-sm text-muted-foreground">
        {totalRows} filas encontradas. {selected.length} de {headers.length} columnas seleccionadas.
      </p>
    </div>
  </div>
)
