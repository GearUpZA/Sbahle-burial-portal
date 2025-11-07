# EMERGENCY DATA RESTORE SCRIPT
# Run this immediately to restore member data!

$headers = @{
    'X-Access-Key' = '$2a$10$LUKvn7ZMDSlDEbqAM45V7ub0iXv2sLBAIH9bqLD7IvyGNJvwFWAne'
    'Content-Type' = 'application/json'
}

# Reconstruct the member data from what we know
$restoreData = @{
    members = @(
        @{id="MEM004"; name="Mpande Sibiya"; email="sotobe114@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM005"; name="Sibulelo Njoli"; email="sbunjoli1@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM006"; name="khanya Pani"; email="Khanyawowo07@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM007"; name="Mlungisi  Maqashela"; email="maqashela@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM008"; name="Zukile Siyanga"; email="kitano187@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM009"; name="Mavuso Mbidlana"; email="mavumbidlana@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM010"; name="Victor April"; email="furaapril@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM011"; name="Zola Cishe"; email="Zolacishe12@gmail.com"; status="Active"; signature="<has signature>"}
        @{id="MEM012"; name="Alisa Mbangani"; email="alisambangani@outlook.com"; status="Active"; signature="<has signature>"}
        @{id="MEM013"; name="Mahlubandile Ntshoko"; email="bandilen@outlook.com"; status="Active"}
        @{id="MEM014"; name="Abongile Mbangani"; email="aleighsa14@gmail.com"; status="Active"}
        @{id="MEM015"; name="Andile Dwayne  Snoek"; email="snoekdwayne@gmail.com"; status="Active"}
    )
    beneficiaries = @()
    payouts = @()
    penalties = @()
    meetingMinutes = @()
    paymentProofs = @()
    payoutCollectors = @()
    memberIdCounter = 16
    minutesIdCounter = 1
    proofIdCounter = 1
    lastSaved = (Get-Date).ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
    version = "2.5-payouts"
}

Write-Host "`n=== RESTORING DATA ===" -ForegroundColor Cyan
Write-Host "This will restore basic member structure" -ForegroundColor Yellow
Write-Host "Members will need to re-add their signatures" -ForegroundColor Yellow
Write-Host "`nPress any key to continue..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

try {
    $body = $restoreData | ConvertTo-Json -Depth 10
    $response = Invoke-RestMethod -Uri 'https://api.jsonbin.io/v3/b/69032dadd0ea881f40c6cfd5' -Method Put -Headers $headers -Body $body
    Write-Host "`n✅ DATA RESTORED!" -ForegroundColor Green
    Write-Host "Members restored: $($restoreData.members.Count)" -ForegroundColor Green
    Write-Host "`n⚠️ NOTE: Members with signatures need to re-save them!" -ForegroundColor Yellow
} catch {
    Write-Host "`n❌ RESTORE FAILED!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}
