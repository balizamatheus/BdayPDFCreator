// Global variables
let excelData = [];
let currentCardIndex = 0;
let generatedPDFs = [];
let templateType = 'pdf';
let pdfTemplateBytes = null;
let pdfTemplateDoc = null;
let fieldPositions = {
    'Nome': { x: 107, y: 380, size: 27, align: 'left' },
    'Vocativo': { x: 115, y: 412, size: 14, align: 'left' },
    'Data': { x: 765, y: 490, size: 18, align: 'right' }
};
let dataByMonth = {};
let currentMonth = null;
let currentZoom = 100;

// Selection tracking
let selectedIndices = new Set();
let selectedMonths = new Set();
let modalSelectedIndices = new Set();
let modalSelectionsByMonth = {}; // Store committed selections for each month
let tempModalSelectionsByMonth = {}; // Store temporary selections (only committed on OK)
let currentModalMonth = null;

// Welcome Modal State
let welcomeExcelFile = null;
let welcomeTemplateFile = null;
let welcomeExcelData = null;
let welcomeTemplateBytes = null;
let useDefaultTemplate = false;

// Workbench Default Template State
let useDefaultTemplateMain = false;

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
    reader.onload = function (e) {
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
    // Check if default template is selected
    const useDefaultCheckbox = document.getElementById('useDefaultTemplate');
    if (useDefaultCheckbox.checked) {
        showErrorAlert('Desmarque a opção "Usar template padrão" para fazer upload de um arquivo.');
        return;
    }

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
    reader.onload = async function (e) {
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
    const useDefaultCheckbox = document.getElementById('useDefaultTemplate');
    useDefaultCheckbox.checked = false;
    useDefaultTemplate = false;
    
    // Remove active class from header
    const welcomeTemplateCard = document.getElementById('welcomeTemplateCard');
    const welcomeTemplateCardHeader = welcomeTemplateCard.querySelector('.upload-card-header');
    if (welcomeTemplateCardHeader) {
        welcomeTemplateCardHeader.classList.remove('active');
    }
    
    welcomeTemplateInput.value = '';
    welcomeTemplateDropzone.style.display = 'flex';
    welcomeTemplateStatus.style.display = 'none';
    welcomeTemplateFile = null;
    welcomeTemplateBytes = null;
    checkWelcomeFilesLoaded();
}

// Toggle default template option
function toggleDefaultTemplate() {
    const useDefaultCheckbox = document.getElementById('useDefaultTemplate');
    const welcomeTemplateCard = document.getElementById('welcomeTemplateCard');
    const welcomeTemplateCardHeader = welcomeTemplateCard.querySelector('.upload-card-header');
    
    if (useDefaultCheckbox.checked) {
        useDefaultTemplate = true;
        welcomeTemplateCardHeader.classList.add('active');
        
        // Hide upload dropzone and show status
        welcomeTemplateDropzone.style.display = 'none';
        welcomeTemplateStatus.style.display = 'flex';
        welcomeTemplateFilename.textContent = 'Template.pdf (padrão)';
        welcomeTemplateSize.textContent = 'Carregando...';
        
        // Load default template
        loadDefaultTemplate();
    } else {
        useDefaultTemplate = false;
        welcomeTemplateCardHeader.classList.remove('active');
        
        // Show upload dropzone and hide status
        welcomeTemplateDropzone.style.display = 'flex';
        welcomeTemplateStatus.style.display = 'none';
        welcomeTemplateFile = null;
        welcomeTemplateBytes = null;
        checkWelcomeFilesLoaded();
    }
}

// Load default template from src folder
async function loadDefaultTemplate() {
    try {
        const response = await fetch('src/Template.pdf');
        if (!response.ok) {
            throw new Error('Não foi possível carregar o template padrão');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        welcomeTemplateBytes = arrayBuffer;
        
        // Update status with file size
        welcomeTemplateSize.textContent = formatFileSize(arrayBuffer.byteLength);
        
        // Check if both files are loaded
        checkWelcomeFilesLoaded();
        
        showSuccessAlert('Template padrão carregado com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar template padrão:', error);
        showErrorAlert('Erro ao carregar o template padrão. Verifique se o arquivo src/Template.pdf existe.');
        
        // Reset checkbox and show upload dropzone
        const useDefaultCheckbox = document.getElementById('useDefaultTemplate');
        useDefaultCheckbox.checked = false;
        useDefaultTemplate = false;
        
        const welcomeTemplateCard = document.getElementById('welcomeTemplateCard');
        const welcomeTemplateCardHeader = welcomeTemplateCard.querySelector('.upload-card-header');
        if (welcomeTemplateCardHeader) {
            welcomeTemplateCardHeader.classList.remove('active');
        }
        
        welcomeTemplateDropzone.style.display = 'flex';
        welcomeTemplateStatus.style.display = 'none';
        welcomeTemplateBytes = null;
        checkWelcomeFilesLoaded();
    }
}

// Toggle default template option in workbench
function toggleDefaultTemplateMain() {
    const useDefaultCheckbox = document.getElementById('useDefaultTemplateMain');
    const checkboxHeader = useDefaultCheckbox.closest('.checkbox-header');
    
    if (useDefaultCheckbox.checked) {
        useDefaultTemplateMain = true;
        checkboxHeader.classList.add('active');
        
        // Hide upload box and show file info
        pdfTemplateBox.style.display = 'none';
        pdfTemplateInfo.style.display = 'flex';
        pdfTemplateName.textContent = 'Template.pdf (padrão)';
        pdfTemplateSize.textContent = 'Carregando...';
        
        // Load default template
        loadDefaultTemplateMain();
    } else {
        useDefaultTemplateMain = false;
        checkboxHeader.classList.remove('active');
        
        // Show upload box and hide file info
        pdfTemplateBox.style.display = 'block';
        pdfTemplateInfo.style.display = 'none';
        pdfTemplateBytes = null;
        pdfTemplateDoc = null;
        fieldPositioning.style.display = 'none';
        
        // Hide PDF frame, show placeholder
        pdfPreviewFrame.style.display = 'none';
        canvasPlaceholder.style.display = 'block';
    }
}

// Load default template from src folder for workbench
async function loadDefaultTemplateMain() {
    try {
        const response = await fetch('src/Template.pdf');
        if (!response.ok) {
            throw new Error('Não foi possível carregar o template padrão');
        }
        
        const arrayBuffer = await response.arrayBuffer();
        pdfTemplateBytes = arrayBuffer;
        pdfTemplateDoc = await PDFLib.PDFDocument.load(pdfTemplateBytes);
        
        // Update file info with file size
        pdfTemplateSize.textContent = formatFileSize(arrayBuffer.byteLength);
        
        // Show field positioning
        fieldPositioning.style.display = 'block';
        updateFieldList();
        initializeFieldInputs();
        updatePDFPreview();
        
        // Show PDF frame, hide placeholder
        pdfPreviewFrame.style.display = 'block';
        canvasPlaceholder.style.display = 'none';
        
        showSuccessAlert('Template padrão carregado com sucesso!');
    } catch (error) {
        console.error('Erro ao carregar template padrão:', error);
        showErrorAlert('Erro ao carregar o template padrão. Verifique se o arquivo src/Template.pdf existe.');
        
        // Reset checkbox and show upload box
        const useDefaultCheckbox = document.getElementById('useDefaultTemplateMain');
        useDefaultCheckbox.checked = false;
        useDefaultTemplateMain = false;
        
        const checkboxHeader = useDefaultCheckbox.closest('.checkbox-header');
        if (checkboxHeader) {
            checkboxHeader.classList.remove('active');
        }
        
        pdfTemplateBox.style.display = 'block';
        pdfTemplateInfo.style.display = 'none';
        pdfTemplateBytes = null;
        pdfTemplateDoc = null;
        fieldPositioning.style.display = 'none';
        
        // Hide PDF frame, show placeholder
        pdfPreviewFrame.style.display = 'none';
        canvasPlaceholder.style.display = 'block';
    }
}

function checkWelcomeFilesLoaded() {
    if (welcomeExcelData && welcomeTemplateBytes) {
        btnStart.disabled = false;
        btnStart.innerHTML = '<span>Iniciar Aplicação</span>';
    } else {
        btnStart.disabled = true;
    }
}

function startApplication() {
    // Clear all selections when starting the application
    selectedIndices.clear();
    selectedMonths.clear();
    modalSelectedIndices.clear();
    modalSelectionsByMonth = {};
    tempModalSelectionsByMonth = {};
    currentModalMonth = null;
    
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
        if (useDefaultTemplate) {
            pdfTemplateBox.style.display = 'none';
            pdfTemplateInfo.style.display = 'flex';
            pdfTemplateName.textContent = 'Template.pdf (padrão)';
            pdfTemplateSize.textContent = formatFileSize(pdfTemplateBytes.byteLength);
        } else if (welcomeTemplateFile) {
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
    // Clear all selections when uploading a new file
    selectedIndices.clear();
    selectedMonths.clear();
    modalSelectedIndices.clear();
    modalSelectionsByMonth = {};
    tempModalSelectionsByMonth = {};
    currentModalMonth = null;
    
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
    reader.onload = function (e) {
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
    updateSelectionCounter();

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
            const selectedCount = dataByMonth[month].filter(row => selectedIndices.has(row.originalIndex)).length;

            tab.innerHTML = `
                <input type="checkbox" class="month-tab-checkbox" data-month="${month}"
                    ${selectedCount === totalCount ? 'checked' : ''}
                    onchange="toggleMonthSelection('${month}')">
                <span class="month-title">${month}</span>
                <span class="month-count">${selectedCount}/${totalCount}</span>
            `;

            // Update month tab status
            updateMonthTabStatus(month);

            tab.addEventListener('click', (e) => {
                if (e.target.type !== 'checkbox') {
                    showMonthContent(month);
                }
            });
            monthTabs.appendChild(tab);
        }
    });

    // Don't show first month by default - user will click on month tabs to open modal
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

    // Open the month selection modal
    openMonthModal(month);
}

// Selection Management Functions
function toggleMonthSelection(month) {
    const monthData = dataByMonth[month];
    if (!monthData) return;

    const checkbox = document.querySelector(`.month-tab-checkbox[data-month="${month}"]`);
    const shouldSelect = checkbox.checked;

    monthData.forEach(row => {
        if (shouldSelect) {
            selectedIndices.add(row.originalIndex);
        } else {
            selectedIndices.delete(row.originalIndex);
        }
    });

    // Update committed selections for this month to match the main selection
    // This ensures that when the modal is opened, it shows the correct selections
    const monthCommittedSelections = new Set();
    monthData.forEach(row => {
        if (selectedIndices.has(row.originalIndex)) {
            monthCommittedSelections.add(row.originalIndex);
        }
    });
    modalSelectionsByMonth[month] = monthCommittedSelections;

    // Update month tab status
    updateMonthTabStatus(month);

    // Update selection counter
    updateSelectionCounter();
}

function updateMonthTabStatus(month) {
    const monthData = dataByMonth[month];
    if (!monthData) return;

    const totalCount = monthData.length;
    const selectedCount = monthData.filter(row => selectedIndices.has(row.originalIndex)).length;
    const tab = document.querySelector(`.month-tab[data-month="${month}"]`);

    if (!tab) return; // Tab might not exist yet

    const checkbox = tab.querySelector(`.month-tab-checkbox[data-month="${month}"]`);
    const countSpan = tab.querySelector('.month-count');

    if (!checkbox || !countSpan) return;

    // Update count display
    countSpan.textContent = `${selectedCount}/${totalCount}`;

    // Remove all status classes
    tab.classList.remove('selected', 'partial');

    // Update checkbox state
    if (selectedCount === 0) {
        checkbox.checked = false;
    } else if (selectedCount === totalCount) {
        checkbox.checked = true;
        tab.classList.add('selected');
    } else {
        checkbox.checked = false;
        tab.classList.add('partial');
    }
}

function updateSelectionCounter() {
    const total = excelData.length;
    const selected = selectedIndices.size;
    dataSummary.textContent = `${selected}/${total} cartões selecionados`;
}


// ========================================
// Month Selection Modal Functions
// ========================================

function openMonthModal(month) {
    // Save current temporary modal selections before switching months
    if (currentModalMonth && modalSelectedIndices.size > 0) {
        tempModalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);
    }
    
    currentModalMonth = month;
    
    // Load committed selections for this month, or start fresh if none exist
    if (modalSelectionsByMonth[month]) {
        modalSelectedIndices = new Set(modalSelectionsByMonth[month]);
    } else {
        modalSelectedIndices = new Set();
        // Copy currently selected indices for this month to modal selection
        if (dataByMonth[month]) {
            dataByMonth[month].forEach(row => {
                if (selectedIndices.has(row.originalIndex)) {
                    modalSelectedIndices.add(row.originalIndex);
                }
            });
        }
    }
    
    // Also check if there are temporary selections for this month (from previous modal session)
    // If so, use those instead of the committed selections
    if (tempModalSelectionsByMonth[month]) {
        modalSelectedIndices = new Set(tempModalSelectionsByMonth[month]);
    }

    // Update modal title
    const monthModalTitle = document.getElementById('monthModalTitle');
    monthModalTitle.textContent = `Seleção de Cartões - ${month}`;

    // Update modal summary
    const monthModalSummary = document.getElementById('monthModalSummary');
    const totalCount = dataByMonth[month] ? dataByMonth[month].length : 0;
    const selectedCount = modalSelectedIndices.size;
    monthModalSummary.innerHTML = `
        <img src="https://img.icons8.com/fluency/48/calendar--v1.png" alt="calendar--v1" class="summary-icon"/>
        <span>${selectedCount} de ${totalCount} cartões selecionados</span>
    `;

    // Populate modal table
    const monthModalTableBody = document.getElementById('monthModalTableBody');
    monthModalTableBody.innerHTML = '';

    if (dataByMonth[month]) {
        dataByMonth[month].forEach((row, idx) => {
            const tr = document.createElement('tr');
            const isSelected = modalSelectedIndices.has(row.originalIndex);
            tr.innerHTML = `
                <td class="checkbox-column">
                    <input type="checkbox" class="modal-checkbox" data-index="${row.originalIndex}"
                        ${isSelected ? 'checked' : ''}
                        onchange="toggleModalSelection(${row.originalIndex})">
                </td>
                <td>${row.Nome || '-'}</td>
                <td>${row.Vocativo || '-'}</td>
                <td>${row.Data || '-'}</td>
                <td>
                    <button class="btn-image-action" onclick="downloadSingleCard(${row.originalIndex})" title="Baixar">
                        <img src="https://img.icons8.com/fluency/48/download.png" alt="download"/>
                    </button>
                </td>
            `;
            monthModalTableBody.appendChild(tr);
        });
    }

    // Update select all checkbox in modal
    updateSelectAllModalCheckbox();

    // Update navigation buttons state
    updateModalNavigationButtons();

    // Show modal
    const monthModal = document.getElementById('monthModal');
    monthModal.style.display = 'flex';
}

function updateModalNavigationButtons() {
    const monthOrder = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        'Outros'
    ];

    if (!currentModalMonth) return;

    const currentIndex = monthOrder.indexOf(currentModalMonth);
    if (currentIndex === -1) return;

    // Find previous month with data
    let prevIndex = currentIndex - 1;
    let hasPrevious = false;
    while (prevIndex >= 0) {
        if (dataByMonth[monthOrder[prevIndex]] && dataByMonth[monthOrder[prevIndex]].length > 0) {
            hasPrevious = true;
            break;
        }
        prevIndex--;
    }

    // Find next month with data
    let nextIndex = currentIndex + 1;
    let hasNext = false;
    while (nextIndex < monthOrder.length) {
        if (dataByMonth[monthOrder[nextIndex]] && dataByMonth[monthOrder[nextIndex]].length > 0) {
            hasNext = true;
            break;
        }
        nextIndex++;
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.month-modal-nav-btn');
    if (navButtons.length >= 2) {
        navButtons[0].disabled = !hasPrevious;
        navButtons[1].disabled = !hasNext;
    }
}

function closeMonthModal(saveSelections = false) {
    // If not saving (cancel), clear all temporary selections
    if (!saveSelections) {
        tempModalSelectionsByMonth = {};
    }
    
    // Save current modal selections before closing (only if explicitly requested)
    if (saveSelections && currentModalMonth && modalSelectedIndices.size > 0) {
        modalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);
    }
    
    const monthModal = document.getElementById('monthModal');
    monthModal.style.display = 'none';
    currentModalMonth = null;
    modalSelectedIndices.clear();
}



function toggleModalSelection(index) {
    if (modalSelectedIndices.has(index)) {
        modalSelectedIndices.delete(index);
    } else {
        modalSelectedIndices.add(index);
    }

    // Save current modal selections to temporary storage
    if (currentModalMonth) {
        tempModalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);
    }

    // Update modal summary
    updateModalSummary();

    // Update select all checkbox in modal
    updateSelectAllModalCheckbox();
}

function selectAllInModal() {
    if (!currentModalMonth || !dataByMonth[currentModalMonth]) return;

    dataByMonth[currentModalMonth].forEach(row => {
        modalSelectedIndices.add(row.originalIndex);
    });

    // Save current modal selections to temporary storage
    tempModalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);

    // Update all checkboxes in the modal table
    document.querySelectorAll('.modal-checkbox').forEach(cb => {
        cb.checked = true;
    });

    // Update modal summary
    updateModalSummary();

    // Update select all checkbox in modal
    updateSelectAllModalCheckbox();
}

function deselectAllInModal() {
    modalSelectedIndices.clear();

    // Save current modal selections (empty set) to temporary storage
    if (currentModalMonth) {
        tempModalSelectionsByMonth[currentModalMonth] = new Set();
    }

    // Update all checkboxes in the modal table
    document.querySelectorAll('.modal-checkbox').forEach(cb => {
        cb.checked = false;
    });

    // Update modal summary
    updateModalSummary();

    // Update select all checkbox in modal
    updateSelectAllModalCheckbox();
}

function toggleSelectAllModal() {
    const checkbox = document.getElementById('selectAllModal');
    if (checkbox.checked) {
        selectAllInModal();
    } else {
        deselectAllInModal();
    }
}

function updateSelectAllModalCheckbox() {
    if (!currentModalMonth || !dataByMonth[currentModalMonth]) return;

    const checkbox = document.getElementById('selectAllModal');
    if (!checkbox) return;

    const monthData = dataByMonth[currentModalMonth];
    const selectedCount = monthData.filter(row => modalSelectedIndices.has(row.originalIndex)).length;

    checkbox.checked = selectedCount === monthData.length;
}

function updateModalSummary() {
    if (!currentModalMonth || !dataByMonth[currentModalMonth]) return;

    const monthModalSummary = document.getElementById('monthModalSummary');
    const totalCount = dataByMonth[currentModalMonth].length;
    const selectedCount = modalSelectedIndices.size;
    monthModalSummary.innerHTML = `
        <img src="https://img.icons8.com/fluency/48/calendar--v1.png" alt="calendar--v1" class="summary-icon"/>
        <span>${selectedCount} de ${totalCount} cartões selecionados</span>
    `;
}

function saveModalSelections() {
    // Save current temporary selections before committing
    if (currentModalMonth && modalSelectedIndices.size > 0) {
        tempModalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);
    }
    
    // Commit temporary selections to committed storage
    for (const month in tempModalSelectionsByMonth) {
        modalSelectionsByMonth[month] = new Set(tempModalSelectionsByMonth[month]);
        
        // Apply modal selections to main selection
        if (dataByMonth[month]) {
            dataByMonth[month].forEach(row => {
                if (tempModalSelectionsByMonth[month].has(row.originalIndex)) {
                    selectedIndices.add(row.originalIndex);
                } else {
                    selectedIndices.delete(row.originalIndex);
                }
            });
        }
    }

    // Update month tab status for all months with temporary selections
    for (const month in tempModalSelectionsByMonth) {
        updateMonthTabStatus(month);
    }

    // Update selection counter
    updateSelectionCounter();

    // Clear temporary selections after committing
    tempModalSelectionsByMonth = {};

    // Close modal and save selections
    closeMonthModal(true);
}

function navigateMonth(direction) {
    const monthOrder = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
        'Outros'
    ];

    if (!currentModalMonth) return;

    const currentIndex = monthOrder.indexOf(currentModalMonth);
    if (currentIndex === -1) return;

    let newIndex = currentIndex + direction;

    // Find the next available month with data
    while (newIndex >= 0 && newIndex < monthOrder.length) {
        const nextMonth = monthOrder[newIndex];
        if (dataByMonth[nextMonth] && dataByMonth[nextMonth].length > 0) {
            openMonthModal(nextMonth);
            return;
        }
        newIndex += direction;
    }
}

async function downloadSelectedFromModal() {
    // Save current temporary selections before committing
    if (currentModalMonth && modalSelectedIndices.size > 0) {
        tempModalSelectionsByMonth[currentModalMonth] = new Set(modalSelectedIndices);
    }
    
    // Check if there are any selections in any month
    let totalSelections = 0;
    for (const month in tempModalSelectionsByMonth) {
        totalSelections += tempModalSelectionsByMonth[month].size;
    }
    
    if (totalSelections === 0) {
        showErrorAlert('Por favor, selecione pelo menos um cartão para baixar.');
        return;
    }

    // Commit temporary selections to committed storage
    for (const month in tempModalSelectionsByMonth) {
        modalSelectionsByMonth[month] = new Set(tempModalSelectionsByMonth[month]);
        
        // Apply modal selections to main selection
        if (dataByMonth[month]) {
            dataByMonth[month].forEach(row => {
                if (tempModalSelectionsByMonth[month].has(row.originalIndex)) {
                    selectedIndices.add(row.originalIndex);
                } else {
                    selectedIndices.delete(row.originalIndex);
                }
            });
        }
    }

    // Update month tab status for all months
    for (const month in tempModalSelectionsByMonth) {
        updateMonthTabStatus(month);
    }

    // Update selection counter
    updateSelectionCounter();

    // Clear temporary selections after committing
    tempModalSelectionsByMonth = {};

    // Close modal and save selections
    closeMonthModal(true);

    // Download selected cards
    await downloadSelectedCards();
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

    // Reset default template checkbox
    const useDefaultCheckbox = document.getElementById('useDefaultTemplateMain');
    if (useDefaultCheckbox) {
        useDefaultCheckbox.checked = false;
        useDefaultTemplateMain = false;
        const checkboxHeader = useDefaultCheckbox.closest('.checkbox-header');
        if (checkboxHeader) {
            checkboxHeader.classList.remove('active');
        }
    }

    // Display file info
    pdfTemplateBox.style.display = 'none';
    pdfTemplateInfo.style.display = 'flex';
    pdfTemplateName.textContent = file.name;
    pdfTemplateSize.textContent = formatFileSize(file.size);

    // Read PDF file
    const reader = new FileReader();
    reader.onload = async function (e) {
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

    // Reset default template checkbox
    const useDefaultCheckbox = document.getElementById('useDefaultTemplateMain');
    if (useDefaultCheckbox) {
        useDefaultCheckbox.checked = false;
        useDefaultTemplateMain = false;
        const checkboxHeader = useDefaultCheckbox.closest('.checkbox-header');
        if (checkboxHeader) {
            checkboxHeader.classList.remove('active');
        }
    }

    // Hide PDF frame, show placeholder
    pdfPreviewFrame.style.display = 'none';
    canvasPlaceholder.style.display = 'block';

    // Reset field positions to default
    fieldPositions = {
        'Nome': { x: 107, y: 380, size: 27, align: 'left' },
        'Vocativo': { x: 115, y: 412, size: 14, align: 'left' },
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

// Helper function to remove accents from Portuguese characters
function removeAccents(str) {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

async function downloadSingleCard(index) {
    const data = excelData[index];
    const pdfBytes = await generatePDFTemplateCard(data);

    if (pdfBytes) {
        // Remove accents, replace spaces with underscores, and remove other special characters
        let safeName = data.Nome || 'cartao';
        safeName = removeAccents(safeName);
        safeName = safeName.replace(/\s+/g, '_');  // Replace spaces with underscores
        safeName = safeName.replace(/[^a-zA-Z0-9_]/g, '');  // Remove other special characters except underscores
        download(new Blob([pdfBytes], { type: 'application/pdf' }), `${safeName}.pdf`);
    }
}

async function generateAllCards() {
    await generateAllPDFTemplateCards();
}

function displayResults() {
    resultsPanelSection.style.display = 'block';
    resultsSummary.textContent = `${generatedPDFs.length} cartões gerados!`;

    resultsList.innerHTML = '';
    generatedPDFs.forEach((pdf, index) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `
            <div class="result-icon"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC4klEQVR4nO3aMU/bQBQH8Kjd+ymKurR7h46ou20FlAxAQV0oDAFBBwYGGCoRmJAygIQAUSEGJKZWdGBgQFRIfAAjAUIojnnnQCCOfXf2q+yoCRWtmgSfDcFP+i+nk3I/3z3HwyUScbVp6brecXFx8YkQ8llENE3LhAoCAAUALEIIisr5+TmenJzshQJCxOcAACJBv1GqqoYD03W9QzToNioUmGEYb8JGeTk9Pd1vO5RQmBEhShUFixqlqioeHx//bBmAk5PPqCR9tWWZUVnGIGKn01ja2roXSr3Py4NK0tugMH/Aenv/i9J1HY+OjoKHMUV5X1uMoiBfXa1mYQHZ0JA/zsbHq2PLy8hnZ5GmUtX5qVR9vpeZmTqsu7uhI5jP54OHsduoZBKRUuS5HPKVFXQJQTY8jHxpCd2DAx/qfP+Obj6PdGAAaV8fYqlUnZ/LIZuaahrlBQCwUCigpmn/DAB0to4ql2sLc7a3kc/P+yhnY6M2ztfX0dnc9FGurv/9CDaBahDe2TrKtpFns/6TdwGQjYzcRWWz6OzsVHeKc3Q1zQ+fm3ugKEr9XeBra8jGxqqI2yhFQWd3F/ni4iPaqXL9+NV2xuupszN09vf9fvJQtKvrkaAUBdno6N0F9vf7u+YdRdrTUx9PJpFlMg8PZSWTr2xZdoP+n7IGB6NDeWVL0gdblr/ZkvTDi5VO75kTE9hypqexeHgYLSqqb78YBTHqbsUoEqPwwaFKpRJaliU019fX4aIopSi6OOfhoorFIt7c3AjN5eVl3FMN15NClctlZIwJjWma7feiYIyFizIMA6+uroTGMIy4pxquJ4WqVCrouq7QWJYVLsr7QdFFKQ3/+HmNLDIk7qmAUN73n8iQsFG2bbdfT5mmiY7jCE2lUol7quGKUeSRoPSQbrw0E8Mw3j2Ku0lNxASAF4kgbpERQipRgwCAEUI+JoKqQqHwEgCGAOBLRMkQQl4HBoorEV39Ao9Z9ZpvVIYRAAAAAElFTkSuQmCC" alt="PDF Icon"></div>
            <div class="result-info">
                <div class="result-name">${pdf.data.Nome || 'Sem nome'}</div>
                <div class="result-status">✓ PDF gerado</div>
            </div>
        `;
        resultsList.appendChild(item);
    });
}

async function downloadAllCards() {
    if (generatedPDFs.length === 0) {
        showErrorAlert('Nenhum PDF gerado para baixar.');
        return;
    }

    try {
        // Create a new ZIP file
        const zip = new JSZip();

        // Add all PDFs to the ZIP, organized by month folders
        generatedPDFs.forEach(pdf => {
            // Extract month from data if available
            let month = 'Outros';
            if (pdf.data && pdf.data.Data) {
                month = parseMonthFromDate(pdf.data.Data);
            }
            
            // Create folder path: month/filename
            const folderPath = `${month}/`;
            zip.file(folderPath + pdf.name, pdf.blob);
        });

        // Generate the ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Download the ZIP file
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        download(zipBlob, `cartoes_${timestamp}.zip`);

        showSuccessAlert(`✅ ${generatedPDFs.length} cartões baixados como arquivo ZIP organizado por mês!`);
    } catch (error) {
        console.error('Erro ao criar arquivo ZIP:', error);
        showErrorAlert('Erro ao criar arquivo ZIP: ' + error.message);
    }
}

async function downloadSelectedCards() {
    if (!pdfTemplateDoc) {
        showErrorAlert('Por favor, carregue um template PDF primeiro.');
        return;
    }

    if (excelData.length === 0) {
        showErrorAlert('Por favor, faça upload de um arquivo Excel primeiro.');
        return;
    }

    if (selectedIndices.size === 0) {
        showErrorAlert('Por favor, selecione pelo menos um cartão para baixar.');
        return;
    }

    progressModal.style.display = 'flex';

    // Track used filenames to handle duplicates
    const usedFilenames = {};
    const generatedPDFs = [];

    // Get selected data
    const selectedData = excelData.filter((_, index) => selectedIndices.has(index));
    const totalSelected = selectedData.length;

    for (let i = 0; i < selectedData.length; i++) {
        const data = selectedData[i];
        const progress = ((i + 1) / totalSelected) * 100;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${i + 1} de ${totalSelected} cartões gerados`;

        try {
            const pdfBytes = await generatePDFTemplateCard(data);

            if (pdfBytes) {
                // Remove accents, replace spaces with underscores, and remove other special characters
                let safeName = data.Nome || 'cartao';
                safeName = removeAccents(safeName);
                safeName = safeName.replace(/\s+/g, '_');
                safeName = safeName.replace(/[^a-zA-Z0-9_]/g, '');

                // Handle duplicate filenames by adding a counter
                let filename = `${safeName}.pdf`;
                let counter = 1;
                while (usedFilenames[filename]) {
                    filename = `${safeName}_${counter}.pdf`;
                    counter++;
                }
                usedFilenames[filename] = true;

                const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

                generatedPDFs.push({
                    name: filename,
                    blob: pdfBlob,
                    data: data
                });
            }
        } catch (error) {
            console.error(`Erro ao gerar cartão para ${data.Nome}:`, error);
        }
    }

    progressModal.style.display = 'none';

    // Download as ZIP
    try {
        // Create a new ZIP file
        const zip = new JSZip();

        // Add all PDFs to the ZIP, organized by month folders
        generatedPDFs.forEach(pdf => {
            // Extract month from data if available
            let month = 'Outros';
            if (pdf.data && pdf.data.Data) {
                month = parseMonthFromDate(pdf.data.Data);
            }
            
            // Create folder path: month/filename
            const folderPath = `${month}/`;
            zip.file(folderPath + pdf.name, pdf.blob);
        });

        // Generate the ZIP file
        const zipBlob = await zip.generateAsync({ type: 'blob' });

        // Download the ZIP file
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        download(zipBlob, `cartoes_${timestamp}.zip`);

        showSuccessAlert(`✅ ${generatedPDFs.length} cartões baixados como arquivo ZIP organizado por mês!`);
    } catch (error) {
        console.error('Erro ao criar arquivo ZIP:', error);
        showErrorAlert('Erro ao criar arquivo ZIP: ' + error.message);
    }
}

function resetUpload() {
    fileInput.value = '';
    uploadBox.style.display = 'block';
    fileInfo.style.display = 'none';
    dataPreviewSection.style.display = 'none';
    excelData = [];
    dataByMonth = {};
    selectedIndices.clear();
    selectedMonths.clear();
    modalSelectedIndices.clear();
    modalSelectionsByMonth = {};
    tempModalSelectionsByMonth = {};
    currentModalMonth = null;
}

function resetAll() {
    resetUpload();
    resetPDFTemplate();
    resultsPanelSection.style.display = 'none';
    generatedPDFs = [];
    selectedIndices.clear();
    selectedMonths.clear();
    modalSelectedIndices.clear();
    modalSelectionsByMonth = {};
    tempModalSelectionsByMonth = {};
    currentModalMonth = null;
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
    console.log('Cartões selecionados:', selectedIndices.size);

    if (!pdfTemplateDoc) {
        showErrorAlert('Por favor, carregue um template PDF primeiro.');
        return;
    }

    if (excelData.length === 0) {
        showErrorAlert('Por favor, faça upload de um arquivo Excel primeiro.');
        return;
    }

    if (selectedIndices.size === 0) {
        showErrorAlert('Por favor, selecione pelo menos um cartão para gerar.');
        return;
    }

    progressModal.style.display = 'flex';
    generatedPDFs = [];

    // Track used filenames to handle duplicates
    const usedFilenames = {};

    // Get selected data
    const selectedData = excelData.filter((_, index) => selectedIndices.has(index));
    const totalSelected = selectedData.length;

    for (let i = 0; i < selectedData.length; i++) {
        const data = selectedData[i];
        const progress = ((i + 1) / totalSelected) * 100;

        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${i + 1} de ${totalSelected} cartões gerados`;

        try {
            const pdfBytes = await generatePDFTemplateCard(data);

            if (pdfBytes) {
                // Remove accents, replace spaces with underscores, and remove other special characters
                let safeName = data.Nome || 'cartao';
                safeName = removeAccents(safeName);
                safeName = safeName.replace(/\s+/g, '_');  // Replace spaces with underscores
                safeName = safeName.replace(/[^a-zA-Z0-9_]/g, '');  // Remove other special characters except underscores

                // Handle duplicate filenames by adding a counter
                let filename = `${safeName}.pdf`;
                let counter = 1;
                while (usedFilenames[filename]) {
                    filename = `${safeName}_${counter}.pdf`;
                    counter++;
                }
                usedFilenames[filename] = true;

                const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });

                generatedPDFs.push({
                    name: filename,
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
            for (const card of cards) {
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

// Glitter effect para upload-boxes
const uploadBoxes = document.querySelectorAll('.upload-box');

uploadBoxes.forEach(box => {
    box.onpointermove = e => {
        const rect = box.getBoundingClientRect();

        // Calcula posição do mouse relativa ao box
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Define variáveis CSS
        box.style.setProperty("--box-mouse-x", `${x}px`);
        box.style.setProperty("--box-mouse-y", `${y}px`);

        // Calcula ratios (0-1)
        const RATIO = {
            x: x / rect.width,
            y: y / rect.height
        };

        box.style.setProperty("--box-ratio-x", RATIO.x);
        box.style.setProperty("--box-ratio-y", RATIO.y);
    };
});

// Glitter effect para file-infos
const fileInfos = document.querySelectorAll('.file-info');

fileInfos.forEach(info => {
    info.onpointermove = e => {
        const rect = info.getBoundingClientRect();

        // Calcula posição do mouse relativa ao file-info
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Define variáveis CSS
        info.style.setProperty("--file-mouse-x", `${x}px`);
        info.style.setProperty("--file-mouse-y", `${y}px`);

        // Calcula ratios (0-1)
        const RATIO = {
            x: x / rect.width,
            y: y / rect.height
        };

        info.style.setProperty("--file-ratio-x", RATIO.x);
        info.style.setProperty("--file-ratio-y", RATIO.y);
    };
});

// Maths function for glitter effect
function fromCenter({ x, y }) {
    return Math.min(Math.max(0, Math.sqrt((y - .5) * (y - .5) + (x - .5) * (x - .5)) / .5), 1);
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
