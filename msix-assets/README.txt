===================================================
  OpenClawForWindows - MSIX Build Kit
===================================================

CONTENUTO:
  - AppxManifest.xml    → Manifest per MSIX
  - Images/             → Icone nelle dimensioni richieste
  - build-msix.ps1      → Script PowerShell automatico

ISTRUZIONI:
  1. Estrai OpenClawForWindows-win32-x64.zip nella stessa cartella
  2. Installa Windows SDK: https://developer.microsoft.com/windows/downloads/windows-sdk/
  3. Apri PowerShell come Amministratore
  4. Esegui:

     .\build-msix.ps1

  5. Per firmare il pacchetto (richiesto per lo Store):

     .\build-msix.ps1 -CertPath .\tuocert.pfx -CertPassword "password"

  6. Carica il file .msix su Microsoft Partner Center

NOTA IMPORTANTE:
  - Nel Partner Center, aggiorna il campo "Publisher" in Identity
    con il valore CN= del tuo certificato Microsoft Store.
  - Il campo "Name" deve corrispondere all'ID riservato nel Partner Center.

===================================================
