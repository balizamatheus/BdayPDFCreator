# Memory Bank - Bday PDF Creator

## Project Overview
Web application for generating personalized congratulation cards in PDF format from Excel data using user-uploaded PDF templates with interactive field positioning.

## Current Architecture
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Libraries**:
  - SheetJS (xlsx) for Excel reading
  - pdf-lib for PDF manipulation
  - Download.js for file downloads
  - html2canvas (for potential future features)
  - jsPDF (for potential future features)

## Workflow
1. Welcome modal: User uploads Excel file and PDF template
2. Application starts with workbench interface
3. User positions text fields (Nome, Vocativo, Data) on PDF template with live preview
4. Excel data is displayed grouped by month with individual download buttons
5. User can generate individual PDFs or batch generate all cards
6. Download generated PDFs

## File Structure
```
BdayPDFCreator/
├── index.html                    # Main interface with welcome modal and workbench
├── script.js                     # Core logic and event handlers
├── style.css                     # Dark theme styling with glitter effects
├── criar_excel_exemplo.html      # Excel example generator
├── exemplo.md                    # Example documentation
├── BASE_DE_CONHECIMENTO.md       # Knowledge base
├── INSTRUCOES_WORKBENCH.md       # Workbench instructions
├── README.md                     # Project documentation
├── memory_bank.md                # This file
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
- **Welcome Modal**: Photoshop-inspired design with glitter effects
  - Drag-and-drop upload areas for Excel and PDF template
  - File validation and status display
  - "Iniciar Aplicação" button (enabled when both files loaded)

- **Workbench Interface**:
  - Header with logo and "GENERATE BATCH" button
  - Left toolbar (Select, Text, Zoom tools)
  - Center canvas with PDF preview and zoom controls (50%-200%)
  - Right properties panel with:
    - Excel upload section
    - PDF template upload section
    - Field positioning controls (X, Y, Size, Alignment)
    - Data preview with month tabs
    - Results panel with download options

### script.js
- **Global Variables**:
  - `excelData`: Array of parsed Excel rows
  - `pdfTemplateBytes`: User-uploaded template data
  - `pdfTemplateDoc`: Loaded PDF document object
  - `fieldPositions`: Customizable positions for fields in PDF
  - `generatedPDFs`: Array of generated PDF blobs
  - `dataByMonth`: Excel data grouped by month
  - `currentZoom`: PDF preview zoom level (default 100%)

- **Main Functions**:
  - Welcome Modal: `handleWelcomeExcel()`, `handleWelcomeTemplate()`, `startApplication()`
  - File Handling: `handleFile()`, `handlePDFTemplate()`
  - UI Updates: `displayPreview()`, `updatePDFPreview()`, `updateFieldList()`
  - PDF Generation: `generatePDFTemplateCard()`, `generateAllPDFTemplateCards()`
  - Downloads: `downloadSingleCard()`, `downloadAllCards()`
  - Utilities: `formatDatePortuguese()`, `excelDateToJSDate()`, `showAlert()`

### PDF Template Integration
- Uses pdf-lib to load and modify user-uploaded PDFs
- Interactive field positioning with live preview
- Default field positions:
  - Nome: x=105, y=380, size=40, align=left
  - Vocativo: x=115, y=425, size=20, align=left
  - Data: x=765, y=490, size=18, align=right
- Fonts: Times Roman (Data), Times Roman Italic (Nome/Vocativo)
- Colors: #1f5684 (Nome/Vocativo), #0d3b66 (Data)
- Text transformations: Vocativo converted to uppercase
- Alignment support: left, center, right

### Data Flow
1. Welcome modal: Upload Excel and PDF template
2. Parse Excel data, validate columns (Nome, Vocativo, Data)
3. Convert dates to Portuguese format: "Brasília, DD de MMMM de YYYY"
4. Group data by month for organized display
5. Load PDF template and allow field positioning
6. Generate PDFs by filling template fields with data
7. Provide individual and batch download options

## Excel Format Requirements
- Columns: Nome, Vocativo, Data (required)
- Data format: DD/MM/YYYY or Excel date serial numbers
- Supports both .xlsx and .xls formats
- Automatic date conversion to Portuguese format

## Dependencies
- xlsx.full.min.js (CDN) - Excel file processing
- pdf-lib.min.js (CDN) - PDF manipulation
- download.min.js (CDN) - File downloads
- html2canvas.min.js (CDN) - Canvas rendering
- jspdf.umd.min.js (CDN) - PDF generation (alternative)

## UI Features
- **Dark Theme**: Professional dark color palette
- **Glitter Effects**: Mouse-tracking light effects on upload cards
- **Responsive Design**: Flexbox-based layout
- **Alert System**: Success/error notifications with auto-dismiss
- **Progress Modal**: Visual feedback during batch generation
- **Zoom Controls**: PDF preview scaling (50%-200%)
- **Month Tabs**: Data organization by birthday months

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

## Usage
1. Open index.html in browser
2. In welcome modal: Upload Excel file and PDF template
3. Click "Iniciar Aplicação"
4. Position text fields on PDF template using controls
5. Review data grouped by months
6. Download individual PDFs or click "GENERATE BATCH"
7. Download all generated PDFs

## Notes
- Works offline after initial CDN load
- Generates one PDF per Excel row
- User-customizable field positions with live preview
- Supports user-uploaded PDF templates
- Portuguese date formatting with Brasília location
- Modern dark UI with interactive effects
- Comprehensive error handling and user feedback