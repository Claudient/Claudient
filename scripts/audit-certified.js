#!/usr/bin/env node

/**
 * audit-certified.js
 *
 * Audit all certified stacks for maintenance SLA compliance.
 *
 * Checks:
 *   - Certification expiration date
 *   - Last update (commit) date
 *   - Average rating (if metadata available)
 *   - Outstanding critical issues (if metadata available)
 *
 * Usage:
 *   node scripts/audit-certified.js [--report] [--json]
 *
 * Options:
 *   --report   Generate human-readable report
 *   --json     Output raw JSON
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const generateReport = args.includes('--report');
const outputJson = args.includes('--json');

// Load catalog.json
const catalogPath = path.join(__dirname, '../marketplace/catalog.json');

if (!fs.existsSync(catalogPath)) {
  console.error(`Error: catalog.json not found at ${catalogPath}`);
  process.exit(1);
}

let catalog;
try {
  catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
} catch (err) {
  console.error(`Error reading catalog.json: ${err.message}`);
  process.exit(1);
}

// Filter to certified stacks
const certifiedStacks = catalog.entries.filter(s => s.certified && s.certificationTier);

if (certifiedStacks.length === 0) {
  console.log('No certified stacks found.');
  process.exit(0);
}

// Audit each stack
const auditResults = certifiedStacks.map(stack => {
  const now = new Date();
  const certifiedDate = new Date(stack.certifiedDate);
  const expiresDate = new Date(stack.certificationExpiresDate);

  const status = {
    id: stack.id,
    name: stack.name,
    tier: stack.certificationTier,
    certifiedDate: stack.certifiedDate,
    expiresDate: stack.certificationExpiresDate,
    daysUntilExpiration: Math.floor((expiresDate - now) / (1000 * 60 * 60 * 24)),
    checks: []
  };

  // Check 1: Expiration date
  if (expiresDate <= now) {
    status.checks.push({
      name: 'Certification Expired',
      status: 'FAILED',
      severity: 'critical'
    });
  } else if (status.daysUntilExpiration < 30) {
    status.checks.push({
      name: 'Certification Expiring Soon',
      status: 'WARNING',
      severity: 'warning',
      daysRemaining: status.daysUntilExpiration
    });
  } else {
    status.checks.push({
      name: 'Certification Valid',
      status: 'PASSED',
      severity: 'info'
    });
  }

  // Check 2: Last update (simplified - would need GitHub API in production)
  // This is a placeholder; real implementation would query GitHub
  status.checks.push({
    name: 'Last Update Check',
    status: 'PENDING',
    severity: 'info',
    note: 'Requires GitHub API access - skipped'
  });

  // Check 3: Rating (simplified - would need marketplace metrics)
  status.checks.push({
    name: 'Rating Threshold',
    status: 'PENDING',
    severity: 'info',
    note: 'Requires marketplace metrics - skipped'
  });

  // Check 4: Outstanding issues (simplified)
  status.checks.push({
    name: 'Critical Issues',
    status: 'PENDING',
    severity: 'info',
    note: 'Requires GitHub API access - skipped'
  });

  status.overallStatus = determineOverallStatus(status.checks);

  return status;
});

// Generate output
if (outputJson) {
  console.log(JSON.stringify(auditResults, null, 2));
} else if (generateReport) {
  generateAuditReport(auditResults);
} else {
  console.log('Certified Stack Audit Results');
  console.log('=============================\n');

  auditResults.forEach(stack => {
    const iconMap = {
      'PASSED': '✓',
      'FAILED': '✗',
      'WARNING': '⚠',
      'PENDING': '?'
    };

    const icon = iconMap[stack.overallStatus] || '?';
    console.log(`${icon} ${stack.name} (${stack.tier})`);
    console.log(`  Expires: ${stack.expiresDate} (${stack.daysUntilExpiration} days)`);
    console.log('');
  });

  const failedCount = auditResults.filter(s => s.overallStatus === 'FAILED').length;
  const warningCount = auditResults.filter(s => s.overallStatus === 'WARNING').length;

  if (failedCount > 0) {
    console.log(`\nCRITICAL: ${failedCount} stack(s) failed audit.`);
  }
  if (warningCount > 0) {
    console.log(`\nWARNING: ${warningCount} stack(s) have issues.`);
  }

  console.log(`\nRun with --report for detailed report or --json for raw data.`);
}

// ============ Helper Functions ============

function determineOverallStatus(checks) {
  if (checks.some(c => c.status === 'FAILED')) {
    return 'FAILED';
  } else if (checks.some(c => c.status === 'WARNING')) {
    return 'WARNING';
  } else if (checks.some(c => c.status === 'PENDING')) {
    return 'PENDING';
  } else {
    return 'PASSED';
  }
}

function generateAuditReport(results) {
  const report = {
    title: 'UitKit Certified Stack Audit Report',
    timestamp: new Date().toISOString(),
    totalCertified: results.length,
    summary: {
      passed: results.filter(s => s.overallStatus === 'PASSED').length,
      warning: results.filter(s => s.overallStatus === 'WARNING').length,
      failed: results.filter(s => s.overallStatus === 'FAILED').length,
      pending: results.filter(s => s.overallStatus === 'PENDING').length
    },
    results: results
  };

  console.log('# Certified Stack Audit Report\n');
  console.log(`Generated: ${report.timestamp}\n`);
  console.log('## Summary\n');
  console.log(`- Total Certified: ${report.totalCertified}`);
  console.log(`- Passed: ${report.summary.passed}`);
  console.log(`- Warning: ${report.summary.warning}`);
  console.log(`- Failed: ${report.summary.failed}`);
  console.log(`- Pending: ${report.summary.pending}\n`);

  console.log('## Details\n');
  results.forEach(stack => {
    console.log(`### ${stack.name}`);
    console.log(`- Tier: ${stack.tier}`);
    console.log(`- Certified: ${stack.certifiedDate}`);
    console.log(`- Expires: ${stack.expiresDate} (${stack.daysUntilExpiration} days)`);
    console.log(`- Status: ${stack.overallStatus}\n`);

    console.log('Checks:');
    stack.checks.forEach(check => {
      const icon = {
        'PASSED': '✓',
        'FAILED': '✗',
        'WARNING': '⚠',
        'PENDING': '?'
      }[check.status] || '?';

      console.log(`  ${icon} ${check.name}: ${check.status}`);
      if (check.note) {
        console.log(`    Note: ${check.note}`);
      }
      if (check.daysRemaining !== undefined) {
        console.log(`    ${check.daysRemaining} days remaining`);
      }
    });
    console.log('');
  });

  // Recommendations
  console.log('## Recommendations\n');

  const failed = results.filter(s => s.overallStatus === 'FAILED');
  if (failed.length > 0) {
    console.log(`1. Address failed stacks (${failed.length}):`);
    failed.forEach(s => {
      console.log(`   - ${s.name}: Certification expired`);
    });
    console.log('');
  }

  const expiringsoon = results.filter(s => s.daysUntilExpiration > 0 && s.daysUntilExpiration < 30);
  if (expiringoon.length > 0) {
    console.log(`2. Schedule recertification for stacks expiring soon (${expiringoon.length}):`);
    expiringoon.forEach(s => {
      console.log(`   - ${s.name}: Expires ${s.expiresDate}`);
    });
    console.log('');
  }

  const pending = results.filter(s => s.overallStatus === 'PENDING');
  if (pending.length > 0) {
    console.log(`3. Verify pending checks (${pending.length}):`);
    console.log('   Run audit with GitHub API access to verify maintenance metrics.');
  }
}
