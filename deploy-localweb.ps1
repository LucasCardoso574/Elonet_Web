# Script de Deploy para LocalWeb via FTP
# Uso: .\deploy-localweb.ps1

param(
    [string]$FtpHost = "ftp.elonethabitacao.com.br",
    [string]$FtpUser = "elonethabitacao1",
    [string]$FtpPassword = "Elo@2020@Elo@!",
    [string]$RemotePath = "/public_html"
)

# Cores para output
function Write-Info {
    param([string]$Message) 
    Write-Host $Message -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host $Message -ForegroundColor Red
}

# Verificar se está na pasta correta
if (-not (Test-Path "package.json")) {
    Write-Error "Erro: Execute este script na raiz do projeto (onde está o package.json)"
    exit 1
}

# Verificar se dist existe
if (-not (Test-Path "dist")) {
    Write-Info "Pasta dist não encontrada. Fazendo build..."
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Erro ao fazer build!"
        exit 1
    }
}

# Credenciais já configuradas como padrão
# Se precisar alterar, passe como parâmetros: .\deploy-localweb.ps1 -FtpHost "outro-host" -FtpUser "outro-user" -FtpPassword "outra-senha"

Write-Info "Iniciando upload para LocalWeb..."
Write-Info "Host: $FtpHost"
Write-Info "Usuário: $FtpUser"
Write-Info "Pasta remota: $RemotePath"

# Criar URI FTP
$ftpUri = "ftp://$FtpHost$RemotePath"

# Função para fazer upload recursivo
function Upload-Folder {
    param(
        [string]$LocalPath,
        [string]$RemotePath
    )
    
    $items = Get-ChildItem -Path $LocalPath
    
    foreach ($item in $items) {
        $remoteItemPath = "$RemotePath/$($item.Name)"
        
        if ($item.PSIsContainer) {
            # É uma pasta
            Write-Info "Criando pasta: $remoteItemPath"
            try {
                $ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost$remoteItemPath")
                $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPassword)
                $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::MakeDirectory
                $ftpRequest.UseBinary = $true
                $ftpRequest.UsePassive = $true
                
                try {
                    $response = $ftpRequest.GetResponse()
                    $response.Close()
                } catch {
                    # Pasta pode já existir, ignorar erro
                }
                
                # Upload recursivo da pasta
                Upload-Folder -LocalPath $item.FullName -RemotePath $remoteItemPath
            } catch {
                Write-Error "Erro ao criar pasta $remoteItemPath : $_"
            }
        } else {
            # É um arquivo
            Write-Info "Enviando arquivo: $($item.Name)"
            try {
                $ftpRequest = [System.Net.FtpWebRequest]::Create("ftp://$FtpHost$remoteItemPath")
                $ftpRequest.Credentials = New-Object System.Net.NetworkCredential($FtpUser, $FtpPassword)
                $ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::UploadFile
                $ftpRequest.UseBinary = $true
                $ftpRequest.UsePassive = $true
                
                $fileContent = [System.IO.File]::ReadAllBytes($item.FullName)
                $ftpRequest.ContentLength = $fileContent.Length
                
                $requestStream = $ftpRequest.GetRequestStream()
                $requestStream.Write($fileContent, 0, $fileContent.Length)
                $requestStream.Close()
                
                $response = $ftpRequest.GetResponse()
                $response.Close()
            } catch {
                Write-Error "Erro ao enviar arquivo $($item.Name) : $_"
            }
        }
    }
}

# Fazer upload da pasta dist
Write-Info "Fazendo upload da pasta dist..."
Upload-Folder -LocalPath "dist" -RemotePath $RemotePath

Write-Success "Deploy concluído com sucesso!"
Write-Info "Acesse seu site para verificar as mudanças."
