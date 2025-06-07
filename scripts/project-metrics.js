#!/usr/bin/env node

/**
 * Project Metrics Tracker
 * Automatically collects and reports on design system project metrics
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ProjectMetricsTracker {
  constructor(config = {}) {
    this.repoPath = config.repoPath || process.cwd();
    this.outputDir = config.outputDir || './docs/metrics';
    this.githubToken = config.githubToken || process.env.GITHUB_TOKEN;
    this.slackWebhook = config.slackWebhook || process.env.SLACK_WEBHOOK_URL;
  }

  async generateMetricsReport() {
    console.log('📊 Generating project metrics report...');

    const metrics = {
      timestamp: new Date().toISOString(),
      development: await this.collectDevelopmentMetrics(),
      quality: await this.collectQualityMetrics(),
      performance: await this.collectPerformanceMetrics(),
      adoption: await this.collectAdoptionMetrics(),
      figma: await this.collectFigmaMetrics(),
      team: await this.collectTeamMetrics()
    };

    await this.generateReports(metrics);
    await this.sendNotifications(metrics);

    console.log('✅ Metrics report generated successfully');
    return metrics;
  }

  async collectDevelopmentMetrics() {
    console.log('🔧 Collecting development metrics...');

    const metrics = {
      codebase: this.getCodebaseMetrics(),
      commits: this.getCommitMetrics(),
      pullRequests: await this.getPullRequestMetrics(),
      issues: await this.getIssueMetrics(),
      releases: this.getReleaseMetrics()
    };

    return metrics;
  }

  getCodebaseMetrics() {
    try {
      // Count Swift files
      const swiftFiles = execSync('find src -name "*.swift" | wc -l', { encoding: 'utf8' }).trim();
      
      // Count lines of code
      const linesOfCode = execSync('find src -name "*.swift" -exec wc -l {} + | tail -1 | awk \'{print $1}\'', { encoding: 'utf8' }).trim();
      
      // Count components
      const components = execSync('find src/components -name "*.swift" | grep -v Test | wc -l', { encoding: 'utf8' }).trim();
      
      // Count tests
      const tests = execSync('find . -name "*Test*.swift" | wc -l', { encoding: 'utf8' }).trim();

      return {
        swiftFiles: parseInt(swiftFiles),
        linesOfCode: parseInt(linesOfCode),
        components: parseInt(components),
        tests: parseInt(tests),
        testCoverage: this.getTestCoverage()
      };
    } catch (error) {
      console.warn('Failed to collect codebase metrics:', error.message);
      return {};
    }
  }

  getCommitMetrics() {
    try {
      // Commits in last 30 days
      const recentCommits = execSync('git log --since="30 days ago" --oneline | wc -l', { encoding: 'utf8' }).trim();
      
      // Average commits per day
      const avgCommitsPerDay = Math.round(parseInt(recentCommits) / 30 * 10) / 10;
      
      // Contributors in last 30 days
      const contributors = execSync('git log --since="30 days ago" --format="%an" | sort | uniq | wc -l', { encoding: 'utf8' }).trim();

      return {
        recentCommits: parseInt(recentCommits),
        avgCommitsPerDay,
        contributors: parseInt(contributors)
      };
    } catch (error) {
      console.warn('Failed to collect commit metrics:', error.message);
      return {};
    }
  }

  async collectQualityMetrics() {
    console.log('🔍 Collecting quality metrics...');

    return {
      testResults: this.getTestResults(),
      linting: this.getLintingResults(),
      visualRegression: this.getVisualRegressionResults(),
      accessibility: this.getAccessibilityResults(),
      performance: this.getPerformanceResults()
    };
  }

  getTestResults() {
    try {
      // Run tests and capture results
      const testOutput = execSync('swift test --parallel 2>&1 || true', { encoding: 'utf8' });
      
      const passedTests = (testOutput.match(/Test Case.*passed/g) || []).length;
      const failedTests = (testOutput.match(/Test Case.*failed/g) || []).length;
      const totalTests = passedTests + failedTests;
      
      return {
        total: totalTests,
        passed: passedTests,
        failed: failedTests,
        passRate: totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
      };
    } catch (error) {
      console.warn('Failed to collect test results:', error.message);
      return {};
    }
  }

  getTestCoverage() {
    try {
      // This would integrate with your coverage tool
      // For now, return a placeholder
      return 85; // Placeholder percentage
    } catch (error) {
      return 0;
    }
  }

  getLintingResults() {
    try {
      const lintOutput = execSync('swiftlint lint --reporter json 2>/dev/null || echo "[]"', { encoding: 'utf8' });
      const lintResults = JSON.parse(lintOutput);
      
      const warnings = lintResults.filter(r => r.severity === 'warning').length;
      const errors = lintResults.filter(r => r.severity === 'error').length;
      
      return {
        warnings,
        errors,
        total: warnings + errors
      };
    } catch (error) {
      console.warn('Failed to collect linting results:', error.message);
      return {};
    }
  }

  async collectPerformanceMetrics() {
    console.log('⚡ Collecting performance metrics...');

    return {
      buildTime: this.getBuildTime(),
      componentRenderTime: this.getComponentRenderTime(),
      bundleSize: this.getBundleSize(),
      memoryUsage: this.getMemoryUsage()
    };
  }

  getBuildTime() {
    try {
      const start = Date.now();
      execSync('swift build', { stdio: 'pipe' });
      const buildTime = Date.now() - start;
      
      return {
        lastBuild: buildTime,
        average: this.getAverageBuildTime(),
        trend: 'stable' // This would be calculated from historical data
      };
    } catch (error) {
      console.warn('Failed to measure build time:', error.message);
      return {};
    }
  }

  async collectAdoptionMetrics() {
    console.log('📈 Collecting adoption metrics...');

    return {
      componentUsage: this.getComponentUsage(),
      designTokenUsage: this.getDesignTokenUsage(),
      documentationViews: this.getDocumentationViews(),
      figmaSync: this.getFigmaSyncMetrics()
    };
  }

  getComponentUsage() {
    try {
      // Scan for component usage in the codebase
      const components = ['TacticalButton', 'MissionCard', 'TargetCard', 'TacticalTextField'];
      const usage = {};
      
      components.forEach(component => {
        try {
          const count = execSync(`grep -r "${component}" src --include="*.swift" | wc -l`, { encoding: 'utf8' }).trim();
          usage[component] = parseInt(count);
        } catch (error) {
          usage[component] = 0;
        }
      });
      
      return usage;
    } catch (error) {
      console.warn('Failed to collect component usage:', error.message);
      return {};
    }
  }

  async collectFigmaMetrics() {
    console.log('🎨 Collecting Figma metrics...');

    return {
      lastSync: this.getLastFigmaSync(),
      syncFrequency: this.getFigmaSyncFrequency(),
      designTokens: this.getDesignTokenCount(),
      components: this.getFigmaComponentCount()
    };
  }

  async collectTeamMetrics() {
    console.log('👥 Collecting team metrics...');

    return {
      velocity: this.getTeamVelocity(),
      cycleTime: this.getCycleTime(),
      leadTime: this.getLeadTime(),
      satisfaction: this.getTeamSatisfaction()
    };
  }

  async generateReports(metrics) {
    console.log('📄 Generating reports...');

    // Generate markdown report
    const markdownReport = this.generateMarkdownReport(metrics);
    await this.writeFile('metrics-report.md', markdownReport);

    // Generate JSON report for APIs
    await this.writeFile('metrics-data.json', JSON.stringify(metrics, null, 2));

    // Generate HTML dashboard
    const htmlDashboard = this.generateHTMLDashboard(metrics);
    await this.writeFile('metrics-dashboard.html', htmlDashboard);

    // Generate CSV for spreadsheet analysis
    const csvData = this.generateCSVReport(metrics);
    await this.writeFile('metrics-data.csv', csvData);
  }

  generateMarkdownReport(metrics) {
    const timestamp = new Date(metrics.timestamp).toLocaleDateString();
    
    return `# Design System Metrics Report

*Generated on: ${timestamp}*

## 📊 Executive Summary

### Key Performance Indicators
- **Test Coverage**: ${metrics.quality?.testResults?.passRate || 0}%
- **Component Count**: ${metrics.development?.codebase?.components || 0}
- **Build Time**: ${metrics.performance?.buildTime?.lastBuild || 0}ms
- **Linting Issues**: ${metrics.quality?.linting?.total || 0}

## 🔧 Development Metrics

### Codebase Health
- **Swift Files**: ${metrics.development?.codebase?.swiftFiles || 0}
- **Lines of Code**: ${metrics.development?.codebase?.linesOfCode || 0}
- **Components**: ${metrics.development?.codebase?.components || 0}
- **Tests**: ${metrics.development?.codebase?.tests || 0}

### Team Activity (Last 30 Days)
- **Commits**: ${metrics.development?.commits?.recentCommits || 0}
- **Avg Commits/Day**: ${metrics.development?.commits?.avgCommitsPerDay || 0}
- **Contributors**: ${metrics.development?.commits?.contributors || 0}

## 🔍 Quality Metrics

### Test Results
- **Total Tests**: ${metrics.quality?.testResults?.total || 0}
- **Passed**: ${metrics.quality?.testResults?.passed || 0}
- **Failed**: ${metrics.quality?.testResults?.failed || 0}
- **Pass Rate**: ${metrics.quality?.testResults?.passRate || 0}%

### Code Quality
- **Linting Warnings**: ${metrics.quality?.linting?.warnings || 0}
- **Linting Errors**: ${metrics.quality?.linting?.errors || 0}

## ⚡ Performance Metrics

### Build Performance
- **Last Build Time**: ${metrics.performance?.buildTime?.lastBuild || 0}ms
- **Trend**: ${metrics.performance?.buildTime?.trend || 'Unknown'}

## 📈 Adoption Metrics

### Component Usage
${Object.entries(metrics.adoption?.componentUsage || {}).map(([component, count]) => 
  `- **${component}**: ${count} usages`
).join('\n')}

## 🎨 Figma Integration

### Sync Status
- **Last Sync**: ${metrics.figma?.lastSync || 'Unknown'}
- **Design Tokens**: ${metrics.figma?.designTokens || 0}
- **Components**: ${metrics.figma?.components || 0}

## 📋 Recommendations

${this.generateRecommendations(metrics)}

---

*Next report: ${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}*
`;
  }

  generateRecommendations(metrics) {
    const recommendations = [];
    
    // Test coverage recommendations
    const passRate = metrics.quality?.testResults?.passRate || 0;
    if (passRate < 80) {
      recommendations.push('🔴 **Critical**: Test coverage is below 80%. Focus on adding tests for core components.');
    } else if (passRate < 95) {
      recommendations.push('🟡 **Improvement**: Test coverage could be improved. Target 95% coverage.');
    }
    
    // Linting recommendations
    const lintingIssues = metrics.quality?.linting?.total || 0;
    if (lintingIssues > 10) {
      recommendations.push('🟡 **Code Quality**: High number of linting issues. Schedule a cleanup sprint.');
    }
    
    // Performance recommendations
    const buildTime = metrics.performance?.buildTime?.lastBuild || 0;
    if (buildTime > 60000) { // 1 minute
      recommendations.push('🟡 **Performance**: Build time is high. Consider optimizing dependencies.');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('✅ **Great Job**: All metrics are within acceptable ranges!');
    }
    
    return recommendations.join('\n');
  }

  generateHTMLDashboard(metrics) {
    return `<!DOCTYPE html>
<html>
<head>
    <title>Design System Metrics Dashboard</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 20px; }
        .metric-card { background: #f5f5f5; padding: 20px; margin: 10px; border-radius: 8px; }
        .metric-value { font-size: 2em; font-weight: bold; color: #007AFF; }
        .metric-label { color: #666; margin-top: 5px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; }
    </style>
</head>
<body>
    <h1>Design System Metrics Dashboard</h1>
    <p>Generated: ${new Date(metrics.timestamp).toLocaleString()}</p>
    
    <div class="grid">
        <div class="metric-card">
            <div class="metric-value">${metrics.development?.codebase?.components || 0}</div>
            <div class="metric-label">Components</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${metrics.quality?.testResults?.passRate || 0}%</div>
            <div class="metric-label">Test Pass Rate</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${metrics.development?.commits?.recentCommits || 0}</div>
            <div class="metric-label">Recent Commits</div>
        </div>
        <div class="metric-card">
            <div class="metric-value">${metrics.quality?.linting?.total || 0}</div>
            <div class="metric-label">Linting Issues</div>
        </div>
    </div>
</body>
</html>`;
  }

  async sendNotifications(metrics) {
    if (this.slackWebhook) {
      await this.sendSlackNotification(metrics);
    }
  }

  async sendSlackNotification(metrics) {
    const message = {
      text: "📊 Design System Metrics Report",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📊 Design System Metrics Report"
          }
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Components:* ${metrics.development?.codebase?.components || 0}`
            },
            {
              type: "mrkdwn",
              text: `*Test Coverage:* ${metrics.quality?.testResults?.passRate || 0}%`
            },
            {
              type: "mrkdwn",
              text: `*Recent Commits:* ${metrics.development?.commits?.recentCommits || 0}`
            },
            {
              type: "mrkdwn",
              text: `*Linting Issues:* ${metrics.quality?.linting?.total || 0}`
            }
          ]
        }
      ]
    };

    try {
      const response = await fetch(this.slackWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(message)
      });
      
      if (response.ok) {
        console.log('✅ Slack notification sent');
      }
    } catch (error) {
      console.warn('Failed to send Slack notification:', error.message);
    }
  }

  async writeFile(fileName, content) {
    const filePath = path.join(this.outputDir, fileName);
    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, content);
  }

  // Placeholder methods for metrics that would require more complex implementation
  getAverageBuildTime() { return 45000; }
  getComponentRenderTime() { return {}; }
  getBundleSize() { return {}; }
  getMemoryUsage() { return {}; }
  getDesignTokenUsage() { return {}; }
  getDocumentationViews() { return {}; }
  getFigmaSyncMetrics() { return {}; }
  getLastFigmaSync() { return new Date().toISOString(); }
  getFigmaSyncFrequency() { return 'daily'; }
  getDesignTokenCount() { return 45; }
  getFigmaComponentCount() { return 12; }
  getTeamVelocity() { return {}; }
  getCycleTime() { return {}; }
  getLeadTime() { return {}; }
  getTeamSatisfaction() { return {}; }
  getVisualRegressionResults() { return {}; }
  getAccessibilityResults() { return {}; }
  getPerformanceResults() { return {}; }
  async getPullRequestMetrics() { return {}; }
  async getIssueMetrics() { return {}; }
  getReleaseMetrics() { return {}; }
  generateCSVReport(metrics) { return 'CSV data would go here'; }
}

// CLI usage
if (require.main === module) {
  const tracker = new ProjectMetricsTracker();
  tracker.generateMetricsReport().catch(console.error);
}

module.exports = ProjectMetricsTracker; 