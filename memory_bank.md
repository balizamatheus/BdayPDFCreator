# Memory Bank - BdayPDF Creator

## Project Overview
Professional web application for generating personalized congratulation cards in PDF format from Excel data using user-uploaded PDF templates with interactive field positioning. Features a Photoshop-inspired workbench interface with welcome modal, month-based data grouping, and advanced selection capabilities.

## Current Architecture
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Libraries**:
  - SheetJS (xlsx) for Excel reading
  - pdf-lib for PDF manipulation
  - JSZip for ZIP file creation
  - Download.js for file downloads
  - html2canvas (for potential future features)
  - jsPDF (for potential future features)

## Workflow
1. **Welcome Modal**: User uploads Excel file and PDF template (or uses default)
2. **Application Start**: Click "Iniciar Aplicação" to enter workbench interface
3. **Workbench Interface**: Professional 3-column layout with header, toolbar, canvas, and properties panel
4. **Field Positioning**: User positions text fields (Nome, Vocativo, Data) on PDF template with live preview
5. **Data Organization**: Excel data displayed grouped by month with individual download buttons
6. **Selection System**: User can select individual cards or entire months
7. **PDF Generation**: User can generate individual PDFs or batch generate selected cards
8. **Download**: Download generated PDFs individually or as ZIP file

## File Structure
```
BdayPDFCreator/
├── index.html                    # Main interface with welcome modal and workbench (431 lines)
├── script.js                     # Core logic and event handlers (1838 lines)
├── style.css                     # Dark theme styling with glitter effects (2106 lines)
├── criar_excel_exemplo.html      # Excel example generator
├── exemplo.md                    # Example documentation for glitter effects
├── BASE_DE_CONHECIMENTO.md       # Knowledge base
├── INSTRUCOES_WORKBENCH.md      # Workbench instructions
├── README.md                     # Project documentation
├── memory_bank.md                # This file
├── sincronizar_brilho_unificado.md # Glitter effect synchronization documentation
└── src/
    ├── iconlogo.svg              # App icon
    ├── logo.svg                  # Logo
    ├── textlogo.svg              # Text logo
    ├── textlogo1.svg             # Alternative text logo
    ├── Template.pdf              # Default PDF template
    └── Template - Copia.pdf      # Backup template
```

## Key Components

### index.html

#### Welcome Modal
- **Photoshop-inspired design** with glitter effects
- **Drag-and-drop upload areas** for Excel and PDF template
- **File validation and status display**
- **Default template checkbox** to use `src/Template.pdf`
- **"Iniciar Aplicação" button** (enabled when both files loaded)
- **Smooth transition** to workbench interface

#### Workbench Interface

**Header (60px)**:
- Logo with icon and text
- "Gerar em lote" button with icon and hover effects

**Left Toolbar (60px)**:
- Select tool (🖱️)
- Text tool (✏️)
- Zoom tool (🔍)
- Active state styling

**Center Canvas (1fr)**:
- PDF preview iframe
- Zoom controls (-, level display, +)
- Placeholder when no template loaded
- Background: #2b2b2b

**Right Properties Panel (320px)**:
1. **Upload Excel Section**
   - Drag-and-drop upload box
   - File info display when loaded
   - Remove button

2. **Template PDF Section**
   - Drag-and-drop upload box
   - "Usar padrão" checkbox
   - File info display when loaded
   - Remove button

3. **Field Positioning Section** (Accordion)
   - Nome field: X, Y, Size, Align controls
   - Vocativo field: X, Y, Size, Align controls
   - Data field: X, Y, Size, Align controls
   - Field list display
   - Update buttons

4. **Data Preview Section**
   - Summary counter (selected/total)
   - Month tabs with checkboxes
   - Month count display (selected/total)
   - Visual states (selected, partial, not selected)

5. **Results Section**
   - Summary display
   - Results list
   - "Baixar ZIP" button
   - "Resetar" button

#### Month Selection Modal
- **Modal header** with navigation buttons (previous/next month)
- **Month title** with close button
- **Summary display** (selected/total)
- **Action buttons**: "Selecionar Todos", "Desmarcar Todos"
- **Table** with checkboxes, Nome, Vocativo, Data, Action columns
- **Footer buttons**: "OK" to save, "Baixar Selecionados"

#### Progress Modal
- **Header**: "🔄 Gerando Cartões..."
- **Progress bar** with animated fill
- **Progress text**: "X de Y cartões gerados"

#### Alert Container
- Success alerts (green) with ✅ icon
- Error alerts (red) with ❌ icon
- Auto-close after 5 seconds
- Close button

### script.js

#### Global Variables

**Data Storage**:
- `excelData`: Array of parsed Excel rows
- `pdfTemplateBytes`: User-uploaded template data (ArrayBuffer)
- `pdfTemplateDoc`: Loaded PDF document object (pdf-lib)
- `fieldPositions`: Customizable positions for fields in PDF
- `dataByMonth`: Excel data grouped by month
- `generatedPDFs`: Array of generated PDF blobs
- `currentCardIndex`: Current card index (legacy)

**Selection State**:
- `selectedIndices`: Set of selected card indices
- `selectedMonths`: Set of selected months
- `modalSelectedIndices`: Set of indices selected in modal
- `currentModalMonth`: Currently displayed month in modal

**UI State**:
- `currentZoom`: PDF preview zoom level (50-200, default 100)
- `templateType`: Template type ('pdf' - legacy)

**Welcome Modal State**:
- `welcomeExcelFile`: Excel file from welcome modal
- `welcomeTemplateFile`: PDF file from welcome modal
- `welcomeExcelData`: Parsed Excel data from welcome modal
- `welcomeTemplateBytes`: PDF bytes from welcome modal
- `useDefaultTemplate`: Flag for using default template in welcome modal

**Workbench State**:
- `useDefaultTemplateMain`: Flag for using default template in workbench

#### Main Functions

**Welcome Modal Functions**:
- `handleWelcomeExcel(file)`: Processes Excel upload in welcome modal
  - Validates file type (.xlsx, .xls)
  - Reads file using FileReader
  - Parses with SheetJS
  - Validates required columns (Nome, Vocativo, Data)
  - Converts dates to Portuguese format
  - Updates UI with file info
  - Calls `checkWelcomeFilesLoaded()`

- `handleWelcomeTemplate(file)`: Processes PDF upload in welcome modal
  - Validates file type (application/pdf)
  - Checks if default template checkbox is unchecked
  - Reads file using FileReader
  - Stores bytes in `welcomeTemplateBytes`
  - Updates UI with file info
  - Calls `checkWelcomeFilesLoaded()`

- `toggleDefaultTemplate()`: Toggles default template option in welcome modal
  - Updates `useDefaultTemplate` flag
  - Shows/hides upload dropzone and status
  - Calls `loadDefaultTemplate()` if checked

- `loadDefaultTemplate()`: Loads default template from `src/Template.pdf`
  - Fetches file using fetch API
  - Stores bytes in `welcomeTemplateBytes`
  - Updates file size display
  - Calls `checkWelcomeFilesLoaded()`
  - Shows success/error alerts

- `checkWelcomeFilesLoaded()`: Checks if both files are loaded
  - Enables/disables "Iniciar Aplicação" button
  - Updates button text

- `startApplication()`: Initializes the application
  - Sets global variables from welcome modal data
  - Loads PDF document using pdf-lib
  - Updates main panel UI with loaded files
  - Calls `displayPreview()`, `updateFieldList()`, `initializeFieldInputs()`, `updatePDFPreview()`
  - Hides welcome modal with fade animation
  - Shows success alert

- `resetWelcomeExcel()`: Resets Excel upload in welcome modal
  - Clears file input
  - Shows dropzone, hides status
  - Clears `welcomeExcelFile` and `welcomeExcelData`
  - Calls `checkWelcomeFilesLoaded()`

- `resetWelcomeTemplate()`: Resets template upload in welcome modal
  - Unchecks default template checkbox
  - Clears `useDefaultTemplate` flag
  - Removes active class from header
  - Clears file input
  - Shows dropzone, hides status
  - Clears `welcomeTemplateFile` and `welcomeTemplateBytes`
  - Calls `checkWelcomeFilesLoaded()`

**Workbench Functions**:

- `handleFile(file)`: Processes Excel upload in workbench
  - Validates file type
  - Reads file using FileReader
  - Parses with SheetJS
  - Validates columns and data
  - Converts dates to Portuguese format
  - Stores in `excelData`
  - Calls `displayPreview()`

- `handlePDFTemplate(file)`: Processes PDF upload in workbench
  - Validates file type
  - Resets default template checkbox
  - Reads file using FileReader
  - Loads PDF using pdf-lib
  - Stores in `pdfTemplateBytes` and `pdfTemplateDoc`
  - Shows field positioning section
  - Calls `updateFieldList()`, `initializeFieldInputs()`, `updatePDFPreview()`
  - Shows PDF preview, hides placeholder
  - Shows success/error alerts

- `handlePDFTemplateSelect(e)`: Handler for PDF file input change

- `toggleDefaultTemplateMain()`: Toggles default template option in workbench
  - Updates `useDefaultTemplateMain` flag
  - Shows/hides upload box and file info
  - Calls `loadDefaultTemplateMain()` if checked

- `loadDefaultTemplateMain()`: Loads default template in workbench
  - Fetches file using fetch API
  - Loads PDF using pdf-lib
  - Updates file info
  - Shows field positioning section
  - Calls `updateFieldList()`, `initializeFieldInputs()`, `updatePDFPreview()`
  - Shows PDF preview, hides placeholder
  - Shows success/error alerts

- `resetUpload()`: Resets Excel upload in workbench
  - Clears file input
  - Shows upload box, hides file info
  - Hides data preview section
  - Clears `excelData`, `dataByMonth`, `selectedIndices`, `selectedMonths`

- `resetPDFTemplate()`: Resets PDF template in workbench
  - Clears file input
  - Shows upload box, hides file info
  - Hides field positioning section
  - Clears `pdfTemplateBytes`, `pdfTemplateDoc`
  - Resets default template checkbox
  - Hides PDF preview, shows placeholder
  - Resets `fieldPositions` to defaults

- `resetAll()`: Resets all data
  - Calls `resetUpload()`
  - Calls `resetPDFTemplate()`
  - Hides results panel
  - Clears `generatedPDFs`, `selectedIndices`, `selectedMonths`

**Data Processing Functions**:

- `displayPreview()`: Displays data preview
  - Shows data preview section
  - Calls `updateSelectionCounter()`
  - Calls `groupDataByMonth()`
  - Calls `displayDataByMonth()`

- `groupDataByMonth()`: Groups Excel data by month
  - Clears `dataByMonth`
  - Iterates through `excelData`
  - Parses month from date string
  - Groups data by month
  - Stores original index for selection tracking

- `displayDataByMonth()`: Displays data grouped by month
  - Clears month tabs
  - Creates tabs for each month with data
  - Shows selected/total count
  - Adds checkboxes for month selection
  - Updates month tab status
  - Adds click handlers to open month modal

- `parseMonthFromDate(dateStr)`: Extracts month name from date string
  - Checks for Portuguese month names
  - Parses date string format (DD/MM/YYYY)
  - Returns month name or "Outros"

- `updateSelectionCounter()`: Updates selection counter display
  - Shows "X/Y cartões selecionados"

- `updateMonthTabStatus(month)`: Updates month tab visual state
  - Calculates selected and total counts
  - Updates count display
  - Updates checkbox state
  - Adds/removes visual classes (selected, partial)

- `showMonthContent(month)`: Shows month content in modal
  - Sets `currentMonth`
  - Updates active tab styling
  - Calls `openMonthModal(month)`

**Month Modal Functions**:

- `openMonthModal(month)`: Opens month selection modal
  - Sets `currentModalMonth`
  - Initializes `modalSelectedIndices` with current selections
  - Updates modal title
  - Updates modal summary
  - Populates modal table
  - Updates select all checkbox
  - Updates navigation buttons
  - Shows modal

- `closeMonthModal()`: Closes month selection modal
  - Hides modal
  - Clears `currentModalMonth`
  - Clears `modalSelectedIndices`

- `toggleMonthSelection(month)`: Toggles selection for entire month
  - Selects/deselects all cards in month
  - Updates `selectedIndices`
  - Calls `updateMonthTabStatus()`
  - Calls `updateSelectionCounter()`

- `toggleModalSelection(index)`: Toggles selection in modal
  - Adds/removes index from `modalSelectedIndices`
  - Calls `updateModalSummary()`
  - Calls `updateSelectAllModalCheckbox()`

- `selectAllInModal()`: Selects all cards in modal
  - Adds all indices to `modalSelectedIndices`
  - Updates all checkboxes
  - Calls `updateModalSummary()`
  - Calls `updateSelectAllModalCheckbox()`

- `deselectAllInModal()`: Deselects all cards in modal
  - Clears `modalSelectedIndices`
  - Updates all checkboxes
  - Calls `updateModalSummary()`
  - Calls `updateSelectAllModalCheckbox()`

- `toggleSelectAllModal()`: Toggles select all checkbox
  - Calls `selectAllInModal()` or `deselectAllInModal()`

- `updateSelectAllModalCheckbox()`: Updates select all checkbox state
  - Checks if all cards are selected
  - Updates checkbox

- `updateModalSummary()`: Updates modal summary display
  - Shows "X de Y cartões selecionados"

- `saveModalSelections()`: Saves modal selections to main selection
  - Applies `modalSelectedIndices` to `selectedIndices`
  - Calls `updateMonthTabStatus()`
  - Calls `updateSelectionCounter()`
  - Closes modal

- `navigateMonth(direction)`: Navigates between months in modal
  - Finds next/previous month with data
  - Opens modal for that month

- `downloadSelectedFromModal()`: Downloads selected cards from modal
  - Validates selection
  - Applies modal selections to main selection
  - Updates UI
  - Closes modal
  - Calls `downloadSelectedCards()`

- `updateModalNavigationButtons()`: Updates navigation button states
  - Enables/disables previous/next buttons
  - Checks for available months with data

**Field Positioning Functions**:

- `initializeFieldInputs()`: Initializes field input values
  - Sets X, Y, Size, Align inputs from `fieldPositions`

- `updateFieldPosition(field)`: Updates field position
  - Reads values from inputs
  - Updates `fieldPositions[field]`
  - Calls `updateFieldList()`
  - Calls `updatePDFPreview()`

- `updateFieldList()`: Updates field list display
  - Clears field list
  - Creates items for each field
  - Shows X, Y, Size, Align values

**PDF Generation Functions**:

- `generatePDFTemplateCard(data)`: Generates a single PDF card
  - Validates template is loaded
  - Loads PDF from `pdfTemplateBytes`
  - Embeds fonts (TimesRoman, TimesRomanItalic)
  - Gets first page
  - Draws text for each field at configured positions
  - Converts Vocativo to uppercase
  - Applies alignment adjustments
  - Uses configured colors and fonts
  - Returns PDF bytes

- `generateAllPDFTemplateCards()`: Generates all selected cards
  - Validates template and data are loaded
  - Validates selection is not empty
  - Shows progress modal
  - Clears `generatedPDFs`
  - Iterates through selected data
  - Generates PDF for each card
  - Sanitizes filenames
  - Handles duplicate filenames with counter
  - Stores in `generatedPDFs`
  - Updates progress bar
  - Hides progress modal
  - Calls `displayResults()`

- `generateAllCards()`: Wrapper for batch generation
  - Calls `generateAllPDFTemplateCards()`

- `displayResults()`: Displays generation results
  - Shows results panel
  - Updates summary text
  - Populates results list

**Download Functions**:

- `downloadSingleCard(index)`: Downloads a single card
  - Gets data from `excelData`
  - Generates PDF
  - Sanitizes filename
  - Downloads using download.js

- `downloadAllCards()`: Downloads all generated cards as ZIP
  - Validates `generatedPDFs` is not empty
  - Creates JSZip instance
  - Adds all PDFs to ZIP
  - Generates ZIP blob
  - Downloads with timestamp
  - Shows success/error alerts

- `downloadSelectedCards()`: Downloads selected cards as ZIP
  - Validates template and data are loaded
  - Validates selection is not empty
  - Shows progress modal
  - Generates PDFs for selected cards
  - Creates ZIP file
  - Downloads with timestamp
  - Shows success/error alerts

**UI Update Functions**:

- `updatePDFPreview()`: Updates PDF preview in canvas
  - Uses sample data for preview
  - Generates PDF with sample data
  - Creates blob and URL
  - Sets iframe src

**Zoom Functions**:

- `zoomIn()`: Increases zoom level
  - Increments by 10% (max 200%)
  - Calls `updateZoom()`

- `zoomOut()`: Decreases zoom level
  - Decrements by 10% (min 50%)
  - Calls `updateZoom()`

- `updateZoom()`: Updates zoom display and transform
  - Updates zoom level text
  - Applies CSS transform to iframe

**Utility Functions**:

- `formatDatePortuguese(dateStr)`: Formats date in Portuguese
  - Parses date string
  - Converts to "Brasília, DD de MMMM de YYYY" format

- `excelDateToJSDate(serial)`: Converts Excel date serial to JS Date
  - Calculates days from Excel epoch
  - Returns formatted date string

- `formatFileSize(bytes)`: Formats file size
  - Converts to Bytes, KB, MB, GB
  - Returns formatted string

- `removeAccents(str)`: Removes accents from string
  - Uses normalize and regex
  - Returns sanitized string

- `showAlert(message, type, title)`: Shows alert notification
  - Creates alert element
  - Adds to alert container
  - Auto-closes after 5 seconds

- `showSuccessAlert(message, title)`: Shows success alert
  - Calls `showAlert()` with type 'success'

- `showErrorAlert(message, title)`: Shows error alert
  - Calls `showAlert()` with type 'error'

- `closeAlert(button)`: Closes alert notification
  - Adds closing class
  - Removes after animation

- `fromCenter({x, y})`: Math function for glitter effect
  - Calculates distance from center
  - Returns normalized value

**Event Listeners**:

- File input change handlers
- Drag-and-drop handlers
- Click handlers for upload boxes
- Toolbar item click handlers
- Accordion toggle handler
- Month tab click handlers
- Modal checkbox handlers
- DOMContentLoaded handler

**Initialization**:

- Sets default active tool (Select)
- Initializes zoom level
- Ensures welcome modal is visible
- Sets body dimensions for glitter effect
- Sets up unified glitter effect listener

### PDF Template Integration

- Uses pdf-lib to load and modify user-uploaded PDFs
- Interactive field positioning with live preview
- Default field positions:
  - Nome: x=107, y=380, size=27, align=left
  - Vocativo: x=115, y=412, size=14, align=left
  - Data: x=765, y=490, size=18, align=right
- Fonts: Times Roman (Data), Times Roman Italic (Nome/Vocativo)
- Colors: #1f5684 (Nome/Vocativo), #0d3b66 (Data)
- Text transformations: Vocativo converted to uppercase
- Alignment support: left, center, right

### Data Flow

1. **Welcome Modal**:
   - Upload Excel and PDF template (or use default)
   - Parse Excel data, validate columns (Nome, Vocativo, Data)
   - Convert dates to Portuguese format: "Brasília, DD de MMMM de YYYY"
   - Group data by month for organized display

2. **Workbench**:
   - Load PDF template and allow field positioning
   - Display data grouped by month with tabs
   - Allow selection of individual cards or entire months

3. **Generation**:
   - Generate PDFs by filling template fields with data
   - Only generate selected cards
   - Sanitize filenames and handle duplicates

4. **Download**:
   - Provide individual download options
   - Provide batch download as ZIP
   - Use JSZip for ZIP creation

## Excel Format Requirements
- Columns: Nome, Vocativo, Data (required)
- Data format: DD/MM/YYYY or Excel date serial numbers
- Supports both .xlsx and .xls formats
- Automatic date conversion to Portuguese format
- Vocativo is automatically converted to uppercase

## Dependencies
- xlsx.full.min.js (CDN) - Excel file processing
- pdf-lib.min.js (CDN) - PDF manipulation
- jszip.min.js (CDN) - ZIP file creation
- download.min.js (CDN) - File downloads
- html2canvas.min.js (CDN) - Canvas rendering (legacy)
- jspdf.umd.min.js (CDN) - PDF generation (legacy)

## UI Features
- **Dark Theme**: Professional dark color palette (#1e1e1e, #252526, #2d2d30, #2b2b2b)
- **Glitter Effects**: Mouse-tracking light effects on upload cards
- **Unified Mouse Tracking**: Single listener on parent container for synchronization
- **Responsive Design**: Flexbox and Grid layouts
- **Alert System**: Success/error notifications with auto-dismiss
- **Progress Modal**: Visual feedback during batch generation
- **Zoom Controls**: PDF preview scaling (50%-200%)
- **Month Tabs**: Data organization by birthday months
- **Accordion Sections**: Collapsible field positioning section
- **Toolbar**: Select, Text, Zoom tools (visual only currently)
- **Month Modal**: Detailed selection with navigation

## Recent Modifications
- Added welcome modal with drag-and-drop uploads
- Implemented workbench interface with canvas and panels
- Added interactive field positioning with live preview
- Integrated zoom functionality for PDF preview
- Added month-based data grouping and tabs
- Implemented dark theme with glitter effects
- Added comprehensive alert and progress systems
- Enhanced PDF generation with alignment support
- Added individual PDF download buttons
- Improved file validation and error handling
- Added default template support
- Implemented month selection modal with navigation
- Added selection system with checkboxes
- Implemented ZIP download functionality using JSZip
- Added filename sanitization and duplicate handling
- Implemented unified glitter effect listener

## Usage
1. Open index.html in browser
2. In welcome modal: Upload Excel file and PDF template (or use default)
3. Click "Iniciar Aplicação"
4. Position text fields on PDF template using controls
5. Review data grouped by months
6. Select cards (by month or individually in modal)
7. Download individual PDFs or click "Gerar em lote"
8. Download all generated PDFs as ZIP

## Notes
- Works offline after initial CDN load
- Generates one PDF per Excel row
- User-customizable field positions with live preview
- Supports user-uploaded PDF templates
- Portuguese date formatting with Brasília location
- Modern dark UI with interactive effects
- Comprehensive error handling and user feedback
- Month-based data organization
- Advanced selection capabilities
- ZIP download for batch operations
- Filename sanitization and duplicate handling

## Technical Details

### Glitter Effect Implementation
- Uses conic gradients with noise textures
- Unified mouse tracking listener on parent container
- Calculates mouse position relative to each card
- Updates CSS variables for gradient positioning
- Synchronized glow effect across all cards

### Selection System
- Uses Set data structure for efficient selection tracking
- Maintains separate selection state for modal
- Updates visual states in real-time
- Supports partial selection states

### PDF Generation
- Sequential processing to avoid browser freezing
- Progress bar for visual feedback
- Error handling per card
- Filename sanitization using normalize and regex
- Duplicate filename handling with counter

### Month Navigation
- Chronological ordering (January to December)
- Navigation between months in modal
- Only shows months with data
- Updates navigation button states dynamically

## Future Improvements
- Complete toolbar functionality (Select, Text tools)
- Drag-and-drop field positioning on canvas
- Save/load field position configurations
- Preview of each card before generation
- Export field configurations
- Multi-page template support
- In-place data editing
- Template history
- Image support in templates
