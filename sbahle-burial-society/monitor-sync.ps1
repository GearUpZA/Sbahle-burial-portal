# ⏰ CLOUD SYNC MONITORING SCRIPT
# Run this every hour to track sync improvements after v2.6.0 deployment

$apiKey = '$2a$10$LUKvn7ZMDSlDEbqAM45V7ub0iXv2sLBAIH9bqLD7IvyGNJvwFWAne'
$binId = '69032dadd0ea881f40c6cfd5'

Write-Host "`n╔═══════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  SBAHLE BURIAL SOCIETY - CLOUD SYNC STATUS MONITOR        ║" -ForegroundColor Cyan
Write-Host "║  Version 2.6.0 Deployment Tracking                        ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

try {
    # Fetch current cloud data
    $response = Invoke-RestMethod -Uri "https://api.jsonbin.io/v3/b/$binId/latest" -Method Get -Headers @{'X-Access-Key'=$apiKey} -TimeoutSec 10
    
    # Calculate time metrics
    $lastUpdate = [DateTime]::Parse($response.metadata.createdAt)
    $now = [DateTime]::UtcNow
    $ageMinutes = ($now - $lastUpdate).TotalMinutes
    $ageHours = ($now - $lastUpdate).TotalHours
    $ageDays = ($now - $lastUpdate).TotalDays
    
    # Format time ago
    $timeAgo = if ($ageMinutes -lt 60) {
        "$([Math]::Round($ageMinutes, 0)) minutes ago"
    } elseif ($ageHours -lt 24) {
        "$([Math]::Round($ageHours, 1)) hours ago"
    } else {
        "$([Math]::Round($ageDays, 1)) days ago"
    }
    
    # Determine sync health color
    $syncHealthColor = if ($ageMinutes -lt 60) { 'Green' } 
                       elseif ($ageHours -lt 24) { 'Yellow' } 
                       else { 'Red' }
    
    # Count data
    $memberCount = $response.record.members.Count
    $sigCount = ($response.record.members | Where-Object {$_.signature -and $_.signature.Length -gt 100}).Count
    $benCount = $response.record.beneficiaries.Count
    $proofCount = $response.record.paymentProofs.Count
    $minutesCount = $response.record.meetingMinutes.Count
    
    # Calculate data size
    $dataJson = $response.record | ConvertTo-Json -Depth 10 -Compress
    $dataSizeKB = [Math]::Round($dataJson.Length / 1024, 2)
    $dataSizeMB = [Math]::Round($dataJson.Length / 1024 / 1024, 3)
    $percentUsed = [Math]::Round(($dataSizeKB / 500) * 100, 1)
    
    # Display results
    Write-Host "📅 TIMESTAMP" -ForegroundColor Cyan
    Write-Host "   Current Time: $($now.ToString('yyyy-MM-dd HH:mm:ss')) UTC" -ForegroundColor White
    Write-Host "   Check Time:   $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    Write-Host ""
    
    Write-Host "☁️  LAST CLOUD SYNC" -ForegroundColor Cyan
    Write-Host "   Last Updated: $($lastUpdate.ToString('yyyy-MM-dd HH:mm:ss')) UTC" -ForegroundColor White
    Write-Host "   Time Ago:     $timeAgo" -ForegroundColor $syncHealthColor
    
    if ($ageMinutes -lt 60) {
        Write-Host "   Status:       ✅ ACTIVE - Members are syncing!" -ForegroundColor Green
    } elseif ($ageHours -lt 24) {
        Write-Host "   Status:       ⚠️  SLOW - Last sync was $timeAgo" -ForegroundColor Yellow
    } else {
        Write-Host "   Status:       ❌ STALE - No sync in $timeAgo (members still on old cache)" -ForegroundColor Red
    }
    Write-Host ""
    
    Write-Host "👥 MEMBER DATA" -ForegroundColor Cyan
    Write-Host "   Total Members:    $memberCount" -ForegroundColor White
    Write-Host "   With Signatures:  $sigCount / $memberCount" -ForegroundColor $(if($sigCount -ge 10){'Green'}elseif($sigCount -ge 6){'Yellow'}else{'Red'})
    
    # List members with signatures
    Write-Host ""
    Write-Host "   Signatures Status:" -ForegroundColor Yellow
    foreach ($m in $response.record.members) {
        $hasSig = $m.signature -and $m.signature.Length -gt 100
        $status = if ($hasSig) { "✅" } else { "❌" }
        $color = if ($hasSig) { 'Green' } else { 'Red' }
        Write-Host "      $status $($m.name)" -ForegroundColor $color
    }
    Write-Host ""
    
    Write-Host "📊 DATA COUNTS" -ForegroundColor Cyan
    Write-Host "   Beneficiaries:    $benCount" -ForegroundColor White
    Write-Host "   Payment Proofs:   $proofCount" -ForegroundColor White
    Write-Host "   Meeting Minutes:  $minutesCount" -ForegroundColor White
    Write-Host ""
    
    Write-Host "💾 STORAGE USAGE" -ForegroundColor Cyan
    Write-Host "   Current Size:     $dataSizeKB KB ($dataSizeMB MB)" -ForegroundColor White
    Write-Host "   Free Tier Limit:  500 KB" -ForegroundColor White
    Write-Host "   Usage:            $percentUsed%" -ForegroundColor $(if($percentUsed -gt 90){'Red'}elseif($percentUsed -gt 70){'Yellow'}else{'Green'})
    
    if ($percentUsed -gt 90) {
        Write-Host "   ⚠️  WARNING: Approaching storage limit!" -ForegroundColor Red
    } elseif ($percentUsed -gt 70) {
        Write-Host "   ⚠️  NOTICE: Over 70% storage used" -ForegroundColor Yellow
    } else {
        Write-Host "   ✅ Storage healthy" -ForegroundColor Green
    }
    Write-Host ""
    
    Write-Host "📈 PROGRESS TRACKING" -ForegroundColor Cyan
    
    # Expected progress after v2.6.0
    $expectedSigs = 12  # All members should eventually have signatures
    $progress = [Math]::Round(($sigCount / $expectedSigs) * 100, 0)
    
    Write-Host "   Signature Progress: $progress% ($sigCount/$expectedSigs)" -ForegroundColor $(if($progress -eq 100){'Green'}elseif($progress -ge 50){'Yellow'}else{'Red'})
    
    # Draw progress bar
    $barLength = 40
    $filledLength = [Math]::Floor($progress * $barLength / 100)
    $bar = "█" * $filledLength + "░" * ($barLength - $filledLength)
    Write-Host "   [$bar] $progress%" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "🎯 RECOMMENDATIONS" -ForegroundColor Cyan
    
    if ($ageHours -gt 24) {
        Write-Host "   ❌ No recent sync activity detected" -ForegroundColor Red
        Write-Host "   → Send cache clear instructions to all members" -ForegroundColor Yellow
        Write-Host "   → Follow up with the 7 members individually" -ForegroundColor Yellow
    } elseif ($ageMinutes -lt 60) {
        Write-Host "   ✅ System is syncing actively!" -ForegroundColor Green
        Write-Host "   → Monitor signature count growth" -ForegroundColor Yellow
        Write-Host "   → Check again in 1 hour" -ForegroundColor Yellow
    } else {
        Write-Host "   ⚠️  Some activity but slow" -ForegroundColor Yellow
        Write-Host "   → Remind members to clear cache" -ForegroundColor Yellow
        Write-Host "   → Check which members are still offline" -ForegroundColor Yellow
    }
    
    if ($sigCount -lt 12) {
        $missingCount = 12 - $sigCount
        Write-Host "   ⚠️  $missingCount member(s) still need to add/sync signatures" -ForegroundColor Yellow
    } else {
        Write-Host "   ✅ All members have signatures!" -ForegroundColor Green
    }
    
    if ($percentUsed -gt 80) {
        Write-Host "   ⚠️  Consider data cleanup or storage upgrade" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host ""
    
    # Save to log file
    $logEntry = @"
[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Last Sync: $timeAgo | Signatures: $sigCount/12 | Size: $dataSizeKB KB
"@
    Add-Content -Path "sync-monitor-log.txt" -Value $logEntry
    Write-Host "✅ Log saved to: sync-monitor-log.txt" -ForegroundColor Green
    Write-Host ""
    
    # Next steps based on status
    Write-Host "🔄 NEXT STEPS" -ForegroundColor Cyan
    if ($ageMinutes -lt 60) {
        Write-Host "   1. ✅ System is working - members are syncing!" -ForegroundColor Green
        Write-Host "   2. Monitor again in 1 hour to track progress" -ForegroundColor White
        Write-Host "   3. Check if signature count increases" -ForegroundColor White
    } else {
        Write-Host "   1. Send WhatsApp reminder to members" -ForegroundColor Yellow
        Write-Host "   2. Contact the 7 members without signatures directly" -ForegroundColor Yellow
        Write-Host "   3. Run this script again in 1 hour" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "To run again: .\monitor-sync.ps1" -ForegroundColor Cyan
    Write-Host ""
    
} catch {
    Write-Host "❌ ERROR: Failed to fetch cloud data" -ForegroundColor Red
    Write-Host "   $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Possible causes:" -ForegroundColor Yellow
    Write-Host "   - Internet connection issue" -ForegroundColor White
    Write-Host "   - JSONBin.io service down" -ForegroundColor White
    Write-Host "   - API key expired" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
