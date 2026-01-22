# Memory Bank - Cartões Automáticos

## Project Overview
Web application for generating personalized congratulation cards in PDF format from Excel data using a predefined PDF template.

## Current Architecture
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Libraries**:
  - SheetJS (xlsx) for Excel reading
  - pdf-lib for PDF manipulation
  - Download.js for file downloads

## Workflow
1. User uploads PDF template
2. Positions fields (Nome, Vocativo, Data) on the template with live preview
3. Uploads Excel file with data
4. Generates personalized PDFs by filling template fields
5. Downloads individual or all PDFs

## File Structure
```
CartoesAutomaticos/
├── index.html          # Main interface
├── script.js           # Core logic
├── style.css           # Styling
├── criar_excel_exemplo.html  # Excel example generator
├── README.md           # Documentation
├── memory_bank.md      # This file
└── src/
    └── Template.pdf    # Default PDF template
```

## Key Components

### index.html
- Excel file upload interface (drag & drop)
- Data preview table (Nome, Vocativo, Data, Ação)
- Individual download buttons per row
- Progress bar for generation
- Results display with download options

### script.js
- **Global Variables**:
  - `excelData`: Array of parsed Excel rows
  - `templateType`: Fixed to 'pdf'
  - `pdfTemplateBytes`: Loaded template data
  - `fieldPositions`: Default positions for fields in PDF

- **Main Functions**:
  - `handlePDFTemplate()`: Processes PDF template upload
  - `handleFile()`: Processes Excel upload
  - `displayPreview()`: Shows data table with download buttons
  - `downloadSingleCard()`: Downloads individual PDF for a row
  - `generateAllPDFTemplateCards()`: Generates all PDFs using template
  - `generatePDFTemplateCard()`: Fills template with single data row
  - `updatePDFPreview()`: Updates live PDF preview with sample data

### PDF Template Integration
- Uses pdf-lib to load and modify PDF
- Fields positioned at:
  - Nome: x=90, y=300, size=50 (italic font, #1f5684)
  - Vocativo: x=90, y=320, size=20 (uppercase, italic font, #1f5684)
  - Data: x=80, y=480, size=16 (normal font, #0d3b66, formatted as "Brasília, DD de MMMM de YYYY")
- Fonts: Times Roman (Data), Helvetica Oblique (Nome/Vocativo)
- Date formatting: Converts DD/MM/YYYY to Portuguese format with Brasília

### Data Flow
1. User uploads Excel (.xlsx/.xls)
2. Validates columns: Nome, Vocativo, Data
3. Parses data, handles date formatting
4. Displays preview table
5. User clicks "Gerar Todos os Cartões"
6. Loads default PDF template
7. For each row: fills template fields, saves as PDF
8. Downloads all generated PDFs

## Excel Format Requirements
- Columns: Nome, Vocativo, Data
- Data format: DD/MM/YYYY (automatically converted to "Brasília, DD de MMMM de YYYY")
- Supports both .xlsx and .xls

## Dependencies
- xlsx.full.min.js (CDN)
- pdf-lib.min.js (CDN)
- download.min.js (CDN)

## Recent Modifications
- Removed HTML/CSS template option
- Removed template selection UI
- Removed card preview functionality
- Changed to user-uploaded PDF template instead of automatic loading
- Added field positioning UI for uploaded templates
- Kept Excel upload and PDF generation with template filling
- Added individual PDF download buttons

## Usage
1. Open index.html in browser
2. Upload PDF template and position fields
3. Upload Excel file with required columns
4. Review data in table
5. Download individual PDFs using "Baixar" buttons or
6. Click "Gerar Todos os Cartões" for batch download
7. Download generated PDFs

## Notes
- Works offline after initial CDN load
- Generates one PDF per Excel row
- Uses default field positions (no customization UI)
- Template PDF must exist in src/Template.pdf