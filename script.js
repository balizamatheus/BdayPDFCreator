// Global variables
let excelData = [];
let currentCardIndex = 0;
let generatedPDFs = [];
let templateType = 'pdf';
let pdfTemplateBytes = null;
let pdfTemplateDoc = null;
let fieldPositions = {
    'Nome': { x: 105, y: 380, size: 40, align: 'left' },
    'Vocativo': { x: 115, y: 425, size: 20, align: 'left' },
    'Data': { x: 765, y: 490, size: 18, align: 'right' }
};
let dataByMonth = {};
let currentMonth = null;
let currentZoom = 100;

// Welcome Modal State
let welcomeExcelFile = null;
let welcomeTemplateFile = null;
let welcomeExcelData = null;
let welcomeTemplateBytes = null;

// Custom Alert System
function showAlert(message, type = 'error', title = null) {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;

    const icon = type === 'success' ? '✅' : '❌';
    const alertTitle = title || (type === 'success' ? 'Sucesso' : 'Erro');

    alert.innerHTML = `
        <div class="alert-icon">${icon}</div>
        <div class="alert-content">
            <div class="alert-title">${alertTitle}</div>
            <div class="alert-message">${message}</div>
        </div>
        <button class="alert-close" onclick="closeAlert(this)">✕</button>
    `;

    alertContainer.appendChild(alert);

    // Auto-close after 5 seconds
    setTimeout(() => {
        closeAlert(alert.querySelector('.alert-close'));
    }, 5000);
}

function closeAlert(button) {
    const alert = button.closest('.alert');
    if (alert) {
        alert.classList.add('closing');
        setTimeout(() => {
            alert.remove();
        }, 300);
    }
}

function showSuccessAlert(message, title = null) {
    showAlert(message, 'success', title);
}

function showErrorAlert(message, title = null) {
    showAlert(message, 'error', title);
}


// DOM Elements - Workbench Layout
const fileInput = document.getElementById('fileInput');
const uploadBox = document.getElementById('uploadBox');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const dataTableBody = document.getElementById('dataTableBody');
const progressModal = document.getElementById('progressModal');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const resultsPanelSection = document.getElementById('resultsPanelSection');
const resultsSummary = document.getElementById('resultsSummary');
const resultsList = document.getElementById('resultsList');
const dataPreviewSection = document.getElementById('dataPreviewSection');
const dataSummary = document.getElementById('dataSummary');
const monthTabs = document.getElementById('monthTabs');

// PDF Template Elements
const pdfTemplateInput = document.getElementById('pdfTemplateInput');
const pdfTemplateBox = document.getElementById('pdfTemplateBox');
const pdfTemplateInfo = document.getElementById('pdfTemplateInfo');
const pdfTemplateName = document.getElementById('pdfTemplateName');
const pdfTemplateSize = document.getElementById('pdfTemplateSize');
const fieldPositioning = document.getElementById('fieldPositioning');
const fieldList = document.getElementById('fieldList');

// Canvas Elements
const pdfPreviewFrame = document.getElementById('pdfPreviewFrame');
const canvasPlaceholder = document.getElementById('canvasPlaceholder');
const zoomLevelDisplay = document.getElementById('zoomLevel');

// Welcome Modal Elements
const welcomeModal = document.getElementById('welcomeModal');
const welcomeExcelInput = document.getElementById('welcomeExcelInput');
const welcomeTemplateInput = document.getElementById('welcomeTemplateInput');
const welcomeExcelDropzone = document.getElementById('welcomeExcelDropzone');
const welcomeTemplateDropzone = document.getElementById('welcomeTemplateDropzone');
const welcomeExcelStatus = document.getElementById('welcomeExcelStatus');
const welcomeTemplateStatus = document.getElementById('welcomeTemplateStatus');
const welcomeExcelFilename = document.getElementById('welcomeExcelFilename');
const welcomeTemplateFilename = document.getElementById('welcomeTemplateFilename');
const welcomeExcelSize = document.getElementById('welcomeExcelSize');
const welcomeTemplateSize = document.getElementById('welcomeTemplateSize');
const btnStart = document.getElementById('btnStart');

// File upload handling
fileInput.addEventListener('change', handleFileSelect);

// Make entire upload box clickable
uploadBox.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        fileInput.click();
    }
});

// PDF Template upload handling
pdfTemplateInput.addEventListener('change', handlePDFTemplateSelect);

// Make entire PDF template upload box clickable
pdfTemplateBox.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        pdfTemplateInput.click();
    }
});

// PDF Template drag and drop
pdfTemplateBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    pdfTemplateBox.classList.add('dragover');
});

pdfTemplateBox.addEventListener('dragleave', () => {
    pdfTemplateBox.classList.remove('dragover');
});

pdfTemplateBox.addEventListener('drop', (e) => {
    e.preventDefault();
    pdfTemplateBox.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handlePDFTemplate(files[0]);
    }
});

// Drag and drop
uploadBox.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadBox.classList.add('dragover');
});

uploadBox.addEventListener('dragleave', () => {
    uploadBox.classList.remove('dragover');
});

uploadBox.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadBox.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});


// ========================================
// Welcome Modal - Event Listeners
// ========================================

// Welcome Excel file input change
welcomeExcelInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleWelcomeExcel(file);
    }
});

// Welcome Template file input change
welcomeTemplateInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleWelcomeTemplate(file);
    }
});

// Make entire welcome Excel dropzone clickable
welcomeExcelDropzone.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        welcomeExcelInput.click();
    }
});

// Make entire welcome Template dropzone clickable
welcomeTemplateDropzone.addEventListener('click', (e) => {
    if (!e.target.closest('button')) {
        welcomeTemplateInput.click();
    }
});

// Welcome Excel drag and drop
welcomeExcelDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    welcomeExcelDropzone.classList.add('dragover');
});

welcomeExcelDropzone.addEventListener('dragleave', () => {
    welcomeExcelDropzone.classList.remove('dragover');
});

welcomeExcelDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    welcomeExcelDropzone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleWelcomeExcel(files[0]);
    }
});

// Welcome Template drag and drop
welcomeTemplateDropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    welcomeTemplateDropzone.classList.add('dragover');
});

welcomeTemplateDropzone.addEventListener('dragleave', () => {
    welcomeTemplateDropzone.classList.remove('dragover');
});

welcomeTemplateDropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    welcomeTemplateDropzone.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleWelcomeTemplate(files[0]);
    }
});


function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
}


// ========================================
// Welcome Modal - File Handling Functions
// ========================================

function handleWelcomeExcel(file) {
    // Validate file type
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && (fileExt !== 'xlsx' && fileExt !== 'xls')) {
        showErrorAlert('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
        return;
    }

    welcomeExcelFile = file;

    // Hide dropzone, show status
    welcomeExcelDropzone.style.display = 'none';
    welcomeExcelStatus.style.display = 'flex';
    welcomeExcelFilename.textContent = file.name;
    welcomeExcelSize.textContent = formatFileSize(file.size);

    // Read Excel file
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {
                type: 'array',
                cellDates: true,
                cellText: false
            });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON with date handling
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                raw: false,
                dateNF: 'dd/mm/yyyy'
            });

            // Validate data
            if (jsonData.length < 2) {
                showErrorAlert('O arquivo Excel deve ter pelo menos uma linha de dados além do cabeçalho.');
                resetWelcomeExcel();
                return;
            }

            // Get headers
            const headers = jsonData[0].map(h => h ? h.toString().trim() : '');

            // Validate required columns
            const requiredColumns = ['Nome', 'Vocativo', 'Data'];
            const missingColumns = requiredColumns.filter(col => !headers.includes(col));

            if (missingColumns.length > 0) {
                showErrorAlert(`Colunas obrigatórias faltando: ${missingColumns.join(', ')}. O arquivo deve ter as colunas: Nome, Vocativo, Data`);
                resetWelcomeExcel();
                return;
            }

            // Parse data
            welcomeExcelData = [];
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (row && row.length > 0) {
                    const rowData = {};
                    headers.forEach((header, index) => {
                        let value = row[index];

                        // Handle date conversion
                        if (header === 'Data' && value !== undefined && value !== null && value !== '') {
                            if (value instanceof Date) {
                                const day = String(value.getDate()).padStart(2, '0');
                                const month = String(value.getMonth() + 1).padStart(2, '0');
                                const year = value.getFullYear();
                                value = `${day}/${month}/${year}`;
                            } else if (typeof value === 'number') {
                                value = excelDateToJSDate(value);
                            } else if (typeof value === 'string') {
                                value = value.trim();
                            }
                            value = formatDatePortuguese(value);
                        } else {
                            value = value ? value.toString().trim() : '';
                        }

                        rowData[header] = value;
                    });
                    welcomeExcelData.push(rowData);
                }
            }

            // Check if both files are loaded
            checkWelcomeFilesLoaded();

        } catch (error) {
            console.error('Erro ao ler arquivo Excel:', error);
            showErrorAlert('Erro ao ler o arquivo Excel. Verifique se o formato está correto.');
            resetWelcomeExcel();
        }
    };
    reader.readAsArrayBuffer(file);
}

function handleWelcomeTemplate(file) {
    // Validate file type
    if (file.type !== 'application/pdf') {
        showErrorAlert('Por favor, selecione um arquivo PDF válido.');
        return;
    }

    welcomeTemplateFile = file;

    // Hide dropzone, show status
    welcomeTemplateDropzone.style.display = 'none';
    welcomeTemplateStatus.style.display = 'flex';
    welcomeTemplateFilename.textContent = file.name;
    welcomeTemplateSize.textContent = formatFileSize(file.size);

    // Read PDF file
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            welcomeTemplateBytes = e.target.result;
            // Check if both files are loaded
            checkWelcomeFilesLoaded();
        } catch (error) {
            console.error('Erro ao ler arquivo PDF:', error);
            showErrorAlert('Erro ao ler o arquivo PDF. Verifique se o formato está correto.');
            resetWelcomeTemplate();
        }
    };
    reader.readAsArrayBuffer(file);
}

function resetWelcomeExcel() {
    welcomeExcelInput.value = '';
    welcomeExcelDropzone.style.display = 'flex';
    welcomeExcelStatus.style.display = 'none';
    welcomeExcelFile = null;
    welcomeExcelData = null;
    checkWelcomeFilesLoaded();
}

function resetWelcomeTemplate() {
    welcomeTemplateInput.value = '';
    welcomeTemplateDropzone.style.display = 'flex';
    welcomeTemplateStatus.style.display = 'none';
    welcomeTemplateFile = null;
    welcomeTemplateBytes = null;
    checkWelcomeFilesLoaded();
}

function checkWelcomeFilesLoaded() {
    if (welcomeExcelData && welcomeTemplateBytes) {
        btnStart.disabled = false;
        btnStart.innerHTML = '<span class="btn-start-icon">🚀</span><span>Iniciar Aplicação</span>';
    } else {
        btnStart.disabled = true;
    }
}

function startApplication() {
    // Set global variables with welcome modal data
    excelData = welcomeExcelData;
    pdfTemplateBytes = welcomeTemplateBytes;

    // Load PDF template document
    PDFLib.PDFDocument.load(pdfTemplateBytes).then((doc) => {
        pdfTemplateDoc = doc;

        // Update main panel UI to show loaded files
        // Update Excel upload box
        if (welcomeExcelFile) {
            uploadBox.style.display = 'none';
            fileInfo.style.display = 'flex';
            fileName.textContent = welcomeExcelFile.name;
            fileSize.textContent = formatFileSize(welcomeExcelFile.size);
        }

        // Update PDF template box
        if (welcomeTemplateFile) {
            pdfTemplateBox.style.display = 'none';
            pdfTemplateInfo.style.display = 'flex';
            pdfTemplateName.textContent = welcomeTemplateFile.name;
            pdfTemplateSize.textContent = formatFileSize(welcomeTemplateFile.size);
        }

        // Display preview in the main app
        displayPreview();
        fieldPositioning.style.display = 'block';
        updateFieldList();
        initializeFieldInputs();
        updatePDFPreview();

        // Show PDF frame, hide placeholder
        pdfPreviewFrame.style.display = 'block';
        canvasPlaceholder.style.display = 'none';

        // Hide welcome modal with animation
        welcomeModal.style.opacity = '0';
        welcomeModal.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            welcomeModal.classList.add('hidden');
            welcomeModal.style.opacity = '1';
        }, 500);

        // Show success alert
        showSuccessAlert('Arquivos carregados com sucesso! Bem-vindo ao BdayPDF Creator.');
    }).catch((error) => {
        console.error('Erro ao carregar template PDF:', error);
        showErrorAlert('Erro ao carregar o template PDF.');
    });
}

function handleFile(file) {
    // Validate file type
    const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!validTypes.includes(file.type) && (fileExt !== 'xlsx' && fileExt !== 'xls')) {
        showErrorAlert('Por favor, selecione um arquivo Excel válido (.xlsx ou .xls)');
        return;
    }

    // Display file info
    uploadBox.style.display = 'none';
    fileInfo.style.display = 'flex';
    fileName.textContent = file.name;
    fileSize.textContent = formatFileSize(file.size);

    // Read Excel file
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, {
                type: 'array',
                cellDates: true,
                cellText: false
            });

            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            // Convert to JSON with date handling
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
                raw: false,
                dateNF: 'dd/mm/yyyy'
            });

            // Validate data
            if (jsonData.length < 2) {
                showErrorAlert('O arquivo Excel deve ter pelo menos uma linha de dados além do cabeçalho.');
                resetUpload();
                return;
            }

            // Get headers
            const headers = jsonData[0].map(h => h ? h.toString().trim() : '');

            // Validate required columns
            const requiredColumns = ['Nome', 'Vocativo', 'Data'];
            const missingColumns = requiredColumns.filter(col => !headers.includes(col));

            if (missingColumns.length > 0) {
                showErrorAlert(`Colunas obrigatórias faltando: ${missingColumns.join(', ')}. O arquivo deve ter as colunas: Nome, Vocativo, Data`);
                resetUpload();
                return;
            }

            // Parse data
            excelData = [];
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (row && row.length > 0) {
                    const rowData = {};
                    headers.forEach((header, index) => {
                        let value = row[index];

                        // Handle date conversion
                        if (header === 'Data' && value !== undefined && value !== null && value !== '') {
                            if (value instanceof Date) {
                                const day = String(value.getDate()).padStart(2, '0');
                                const month = String(value.getMonth() + 1).padStart(2, '0');
                                const year = value.getFullYear();
                                value = `${day}/${month}/${year}`;
                            } else if (typeof value === 'number') {
                                value = excelDateToJSDate(value);
                            } else if (typeof value === 'string') {
                                value = value.trim();
                            }
                            value = formatDatePortuguese(value);
                        } else {
                            value = value ? value.toString().trim() : '';
                        }

                        rowData[header] = value;
                    });
                    excelData.push(rowData);
                }
            }

            // Display preview
            displayPreview();

        } catch (error) {
            console.error('Erro ao ler arquivo Excel:', error);
            showErrorAlert('Erro ao ler o arquivo Excel. Verifique se o formato está correto.');
            resetUpload();
        }
    };
    reader.readAsArrayBuffer(file);
}

function excelDateToJSDate(serial) {
    const utc_days = Math.floor(serial - 25569);
    const utc_value = utc_days * 86400;
    const date_info = new Date(utc_value * 1000);

    const day = String(date_info.getDate()).padStart(2, '0');
    const month = String(date_info.getMonth() + 1).padStart(2, '0');
    const year = date_info.getFullYear();

    return `${day}/${month}/${year}`;
}

function formatDatePortuguese(dateStr) {
    const parts = dateStr.split('/');
    if (parts.length !== 3) return dateStr;
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = parseInt(parts[2]);

    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    return `Brasília, ${day} de ${monthNames[month]} de ${year}`;
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

function displayPreview() {
    dataPreviewSection.style.display = 'block';
    dataSummary.textContent = `📊 Total de cartões: ${excelData.length}`;

    // Group data by month
    groupDataByMonth();

    // Display data grouped by month
    displayDataByMonth();
}

function parseMonthFromDate(dateStr) {
    const monthNames = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    for (let i = 0; i < monthNames.length; i++) {
        if (dateStr.includes(monthNames[i])) {
            return monthNames[i];
        }
    }

    const parts = dateStr.split('/');
    if (parts.length === 3) {
        const monthIndex = parseInt(parts[1]) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
            return monthNames[monthIndex];
        }
    }

    return 'Outros';
}

function groupDataByMonth() {
    dataByMonth = {};

    excelData.forEach((row, index) => {
        const month = parseMonthFromDate(row.Data || '');
        if (!dataByMonth[month]) {
            dataByMonth[month] = [];
        }
        dataByMonth[month].push({ ...row, originalIndex: index });
    });
}

function displayDataByMonth() {
    monthTabs.innerHTML = '';
    dataTableBody.innerHTML = '';

    const monthOrder = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        'Outros'
    ];

    // Create tabs
    monthOrder.forEach(month => {
        if (dataByMonth[month] && dataByMonth[month].length > 0) {
            const tab = document.createElement('div');
            tab.className = 'month-tab';
            tab.dataset.month = month;

            const totalCount = dataByMonth[month].length;

            tab.innerHTML = `
                <span class="month-title">${month}</span>
                <span class="month-count">${totalCount}</span>
            `;

            tab.addEventListener('click', () => showMonthContent(month));
            monthTabs.appendChild(tab);
        }
    });

    // Show first month by default
    if (monthOrder.some(month => dataByMonth[month] && dataByMonth[month].length > 0)) {
        const firstMonth = monthOrder.find(month => dataByMonth[month] && dataByMonth[month].length > 0);
        if (firstMonth) {
            showMonthContent(firstMonth);
        }
    }
}

function showMonthContent(month) {
    currentMonth = month;

    // Remove active class from all tabs
    document.querySelectorAll('.month-tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Add active class to selected tab
    const tab = document.querySelector(`.month-tab[data-month="${month}"]`);
    if (tab) {
        tab.classList.add('active');
    }

    // Update table with month data
    dataTableBody.innerHTML = '';
    if (dataByMonth[month]) {
        dataByMonth[month].forEach((row, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Nome || '-'}</td>
                <td>${row.Vocativo || '-'}</td>
                <td>${row.Data || '-'}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="downloadSingleCard(${row.originalIndex})">
                        📥
                    </button>
                </td>
            `;
            dataTableBody.appendChild(tr);
        });
    }
}

// PDF Template handling
function handlePDFTemplateSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handlePDFTemplate(file);
    }
}

async function handlePDFTemplate(file) {
    // Validate file type
    if (file.type !== 'application/pdf') {
        showErrorAlert('Por favor, selecione um arquivo PDF válido.');
        return;
    }

    // Display file info
    pdfTemplateBox.style.display = 'none';
    pdfTemplateInfo.style.display = 'flex';
    pdfTemplateName.textContent = file.name;
    pdfTemplateSize.textContent = formatFileSize(file.size);

    // Read PDF file
    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            pdfTemplateBytes = e.target.result;
            pdfTemplateDoc = await PDFLib.PDFDocument.load(pdfTemplateBytes);

            // Show field positioning
            fieldPositioning.style.display = 'block';
            updateFieldList();
            initializeFieldInputs();
            updatePDFPreview();

            // Show PDF frame, hide placeholder
            pdfPreviewFrame.style.display = 'block';
            canvasPlaceholder.style.display = 'none';

            showSuccessAlert('Template PDF carregado com sucesso!');
        } catch (error) {
            console.error('Erro ao ler arquivo PDF:', error);
            showErrorAlert('Erro ao ler o arquivo PDF. Verifique se o formato está correto.');
            resetPDFTemplate();
        }
    };
    reader.readAsArrayBuffer(file);
}

function resetPDFTemplate() {
    pdfTemplateInput.value = '';
    pdfTemplateBox.style.display = 'block';
    pdfTemplateInfo.style.display = 'none';
    fieldPositioning.style.display = 'none';
    pdfTemplateBytes = null;
    pdfTemplateDoc = null;

    // Hide PDF frame, show placeholder
    pdfPreviewFrame.style.display = 'none';
    canvasPlaceholder.style.display = 'block';

    // Reset field positions to default
    fieldPositions = {
        'Nome': { x: 105, y: 380, size: 40, align: 'left' },
        'Vocativo': { x: 115, y: 425, size: 20, align: 'left' },
        'Data': { x: 765, y: 490, size: 18, align: 'right' }
    };

    updateFieldList();
}

function initializeFieldInputs() {
    // Initialize inputs with current field positions
    const fields = ['Nome', 'Vocativo', 'Data'];
    fields.forEach(field => {
        const pos = fieldPositions[field];
        if (pos) {
            document.getElementById(field.toLowerCase() + 'X').value = pos.x;
            document.getElementById(field.toLowerCase() + 'Y').value = pos.y;
            document.getElementById(field.toLowerCase() + 'Size').value = pos.size;
            document.getElementById(field.toLowerCase() + 'Align').value = pos.align || 'left';
        }
    });
}

function updateFieldPosition(field) {
    const fieldLower = field.toLowerCase();
    fieldPositions[field] = {
        x: parseInt(document.getElementById(fieldLower + 'X').value),
        y: parseInt(document.getElementById(fieldLower + 'Y').value),
        size: parseInt(document.getElementById(fieldLower + 'Size').value),
        align: document.getElementById(fieldLower + 'Align').value
    };

    updateFieldList();
    updatePDFPreview();
}

function updateFieldList() {
    fieldList.innerHTML = '';

    Object.keys(fieldPositions).forEach(field => {
        const pos = fieldPositions[field];
        const item = document.createElement('div');
        item.className = 'field-list-item';
        const alignText = pos.align === 'left' ? 'Esq' : (pos.align === 'center' ? 'Cen' : 'Dir');
        item.innerHTML = `
            <span class="field-name">${field}</span>
            <span class="field-coords">X: ${pos.x}, Y: ${pos.y}, T: ${pos.size}, A: ${alignText}</span>
        `;
        fieldList.appendChild(item);
    });
}

async function updatePDFPreview() {
    if (!pdfTemplateDoc) return;

    const sampleData = {
        'Nome': 'Cel Av Nicolas Silva Mendes',
        'Vocativo': 'Ao Senhor',
        'Data': 'Brasília, 05 de Março de 2026'
    };

    try {
        const pdfBytes = await generatePDFTemplateCard(sampleData);
        if (pdfBytes) {
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            pdfPreviewFrame.src = url;
        }
    } catch (error) {
        console.error('Erro ao atualizar prévia:', error);
    }
}

// Zoom functions
function zoomIn() {
    if (currentZoom < 200) {
        currentZoom += 10;
        updateZoom();
    }
}

function zoomOut() {
    if (currentZoom > 50) {
        currentZoom -= 10;
        updateZoom();
    }
}

function updateZoom() {
    zoomLevelDisplay.textContent = `${currentZoom}%`;
    pdfPreviewFrame.style.transform = `scale(${currentZoom / 100})`;
    pdfPreviewFrame.style.transformOrigin = 'center center';
}

async function downloadSingleCard(index) {
    const data = excelData[index];
    const pdfBytes = await generatePDFTemplateCard(data);

    if (pdfBytes) {
        const safeName = (data.Nome || 'cartao').replace(/[^a-zA-Z0-9]/g, '_');
        download(new Blob([pdfBytes], { type: 'application/pdf' }), `${safeName}.pdf`);
    }
}

async function generateAllCards() {
    await generateAllPDFTemplateCards();
}

function displayResults() {
    resultsPanelSection.style.display = 'block';
    resultsSummary.textContent = `✅ ${generatedPDFs.length} cartões gerados!`;

    resultsList.innerHTML = '';
    generatedPDFs.forEach((pdf, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <div class="result-icon">📄</div>
            <div class="result-info">
                <div class="result-name">${pdf.data.Nome || 'Sem nome'}</div>
                <div class="result-status">✓ PDF gerado</div>
            </div>
        `;
        resultsList.appendChild(item);
    });
}

function downloadAllCards() {
    generatedPDFs.forEach(pdf => {
        const url = URL.createObjectURL(pdf.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = pdf.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    });
}

function resetUpload() {
    fileInput.value = '';
    uploadBox.style.display = 'block';
    fileInfo.style.display = 'none';
    dataPreviewSection.style.display = 'none';
    excelData = [];
    dataByMonth = {};
}

function resetAll() {
    resetUpload();
    resetPDFTemplate();
    resultsPanelSection.style.display = 'none';
    generatedPDFs = [];
}




async function generatePDFTemplateCard(data) {
    if (!pdfTemplateDoc) {
        showErrorAlert('Por favor, carregue um template PDF primeiro.');
        return null;
    }

    try {
        console.log('Gerando PDF com template:', data);
        console.log('Posições dos campos:', fieldPositions);

        // Load the PDF template
        const pdfDoc = await PDFLib.PDFDocument.load(pdfTemplateBytes);

        // Embed fonts
        const normalFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRoman);
        const italicFont = await pdfDoc.embedFont(PDFLib.StandardFonts.TimesRomanItalic);

        // Get the first page
        const pages = pdfDoc.getPages();
        const firstPage = pages[0];

        console.log('Página do template:', firstPage);

        // Add text for each field
        Object.keys(fieldPositions).forEach(field => {
            let value = data[field] || '';
            const pos = fieldPositions[field];

            console.log(`Adicionando campo ${field}:`, value, 'na posição:', pos);

            if (value) {
                if (field === 'Vocativo') {
                    value = value.toUpperCase();
                }
                const font = (field === 'Nome' || field === 'Vocativo') ? italicFont : normalFont;
                const color = (field === 'Nome' || field === 'Vocativo') ? PDFLib.rgb(31 / 255, 86 / 255, 132 / 255) : PDFLib.rgb(13 / 255, 59 / 255, 102 / 255);

                // Calculate text width for alignment
                const textWidth = font.widthOfTextAtSize(value, pos.size);
                let adjustedX = pos.x;

                // Adjust X based on alignment
                const align = pos.align || 'left';
                if (align === 'center') {
                    adjustedX = pos.x - (textWidth / 2);
                } else if (align === 'right') {
                    adjustedX = pos.x - textWidth;
                }

                firstPage.drawText(value, {
                    x: adjustedX,
                    y: pos.y,
                    size: pos.size,
                    font: font,
                    color: color,
                });
            }
        });

        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        console.log('PDF gerado com sucesso!');
        return pdfBytes;

    } catch (error) {
        console.error('Erro ao gerar PDF:', error);
        showErrorAlert('Erro ao gerar o PDF: ' + error.message);
        return null;
    }
}


async function generateAllPDFTemplateCards() {
    console.log('Iniciando geração de cartões PDF com template...');
    console.log('Template carregado:', pdfTemplateDoc ? 'Sim' : 'Não');
    console.log('Dados Excel:', excelData.length, 'cartões');

    if (!pdfTemplateDoc) {
        showErrorAlert('Por favor, carregue um template PDF primeiro.');
        return;
    }

    if (excelData.length === 0) {
        showErrorAlert('Por favor, faça upload de um arquivo Excel primeiro.');
        return;
    }

    progressModal.style.display = 'flex';
    generatedPDFs = [];

    for (let i = 0; i < excelData.length; i++) {
        const data = excelData[i];
        const progress = ((i + 1) / excelData.length) * 100;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${i + 1} de ${excelData.length} cartões gerados`;

        try {
            const pdfBytes = await generatePDFTemplateCard(data);

            if (pdfBytes) {
                const safeName = (data.Nome || 'cartao').replace(/[^a-zA-Z0-9]/g, '_');
                const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

                generatedPDFs.push({
                    name: `${safeName}.pdf`,
                    blob: pdfBlob,
                    data: data
                });
            }
        } catch (error) {
            console.error(`Erro ao gerar cartão para ${data.Nome}:`, error);
        }
    }

    progressModal.style.display = 'none';
    displayResults();
}

// Toolbar functionality
const toolbarItems = document.querySelectorAll('.toolbar-item');

toolbarItems.forEach(item => {
    item.addEventListener('click', () => {
        const tool = item.dataset.tool;
        
        // Remove active class from all items
        toolbarItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to selected item
        item.classList.add('active');
        
        console.log('Tool selected:', tool);
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set default active tool
    const defaultTool = document.querySelector('.toolbar-item[data-tool="select"]');
    if (defaultTool) {
        defaultTool.classList.add('active');
    }
    
    // Initialize zoom level
    updateZoom();

    // Ensure welcome modal is visible on page load
    if (welcomeModal) {
        welcomeModal.classList.remove('hidden');
    }
    
    // Set body dimensions for glitter effect
    document.body.style.setProperty("--dw", document.body.clientWidth + "px");
    document.body.style.setProperty("--dh", document.body.clientHeight + "px");
    
    // Mouse tracking for glitter effect - unified listener on parent container
    const uploadContainer = document.querySelector(".upload-grid");
    const cards = document.getElementsByClassName("upload-card");
    
    if (uploadContainer) {
        uploadContainer.onpointermove = e => {
            for(const card of cards) {
                const rect = card.getBoundingClientRect();
                
                // Calcula a posição do mouse em relação a CADA card,
                // mesmo que o mouse não esteja sobre ele no momento.
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Define as variáveis de posição (necessárias para o gradiente)
                card.style.setProperty("--mouse-x", `${x}px`);
                card.style.setProperty("--mouse-y", `${y}px`);
                
                // Mantém a lógica de RATIO que você já utiliza
                const RATIO = {
                    x: x / rect.width,
                    y: y / rect.height
                };
                
                card.style.setProperty("--ratio-x", RATIO.x);
                card.style.setProperty("--ratio-y", RATIO.y);
            }
        };
    }
});

// Maths function for glitter effect
function fromCenter({ x, y }) {
    return Math.min(Math.max( 0, Math.sqrt( (y - .5) * (y - .5) + (x  - .5) * (x  - .5) ) / .5 ), 1 );
}

// Accordion functionality for Field Positioning
document.addEventListener('DOMContentLoaded', function() {
    const fieldPositioning = document.getElementById('fieldPositioning');
    if (fieldPositioning) {
        const toggle = fieldPositioning.querySelector('.accordion-toggle');
        if (toggle) {
            toggle.addEventListener('click', function() {
                fieldPositioning.classList.toggle('active');
            });
        }
    }
});
