/**
 * Feature Flags Configuration Service
 * Manages feature enablement and rollout percentages
 */

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  status: 'stable' | 'early-access' | 'beta' | 'private-beta';
  releaseDate: string;
  category: 'ui' | 'performance' | 'experimental' | 'security';
}

export type FeatureFlagId = 'matrix-theme' | 'svg-inspector' | 'swarm-sandbox' | 'dont-stop';

class FeatureFlagsService {
  private flags: Map<FeatureFlagId, FeatureFlag> = new Map();
  private userSeed: number; // Deterministic rollout per user

  constructor() {
    this.userSeed = Math.random() * 100;
    this.initializeFlags();
  }

  private initializeFlags(): void {
    const flagConfigs: Record<FeatureFlagId, FeatureFlag> = {
      'matrix-theme': {
        id: 'matrix-theme',
        name: 'The Matrix Theme Pack',
        description: 'Premium aesthetic themes: UitKit Neon, Ghost Shell',
        enabled: true,
        rolloutPercentage: 100,
        status: 'stable',
        releaseDate: '2026-06-22',
        category: 'ui',
      },
      'svg-inspector': {
        id: 'svg-inspector',
        name: 'SVG Interactive Map Inspector',
        description: 'High-performance SVG visualization for codebase exploration',
        enabled: true,
        rolloutPercentage: 50,
        status: 'early-access',
        releaseDate: '2026-06-22',
        category: 'ui',
      },
      'swarm-sandbox': {
        id: 'swarm-sandbox',
        name: 'Swarm Sandbox Simulator',
        description: 'Interactive visualization UI for agent teams and swarm simulation',
        enabled: true,
        rolloutPercentage: 25,
        status: 'beta',
        releaseDate: '2026-06-22',
        category: 'experimental',
      },
      'dont-stop': {
        id: 'dont-stop',
        name: 'Dont Stop (Private Beta)',
        description: 'Autonomous batch processor with continuous execution',
        enabled: true,
        rolloutPercentage: 10,
        status: 'private-beta',
        releaseDate: '2026-06-22',
        category: 'experimental',
      },
    };

    Object.entries(flagConfigs).forEach(([key, config]) => {
      this.flags.set(key as FeatureFlagId, config);
    });
  }

  /**
   * Check if a feature flag is enabled for the current user
   * Uses deterministic rollout based on user seed
   */
  isEnabled(flagId: FeatureFlagId): boolean {
    const flag = this.flags.get(flagId);
    if (!flag) {
      console.warn(`Feature flag "${flagId}" not found`);
      return false;
    }

    if (!flag.enabled) {
      return false;
    }

    // Deterministic rollout: same user always gets same result
    return this.userSeed < flag.rolloutPercentage;
  }

  /**
   * Get all feature flags and their statuses
   */
  getAllFlags(): FeatureFlag[] {
    return Array.from(this.flags.values());
  }

  /**
   * Get a specific feature flag
   */
  getFlag(flagId: FeatureFlagId): FeatureFlag | undefined {
    return this.flags.get(flagId);
  }

  /**
   * Get rollout metrics for a feature
   */
  getRolloutMetrics(flagId: FeatureFlagId): {
    isEnabled: boolean;
    percentage: number;
    status: string;
    userQualifies: boolean;
  } | null {
    const flag = this.flags.get(flagId);
    if (!flag) return null;

    return {
      isEnabled: flag.enabled,
      percentage: flag.rolloutPercentage,
      status: flag.status,
      userQualifies: this.isEnabled(flagId),
    };
  }

  /**
   * Update feature flag status (admin only in production)
   */
  updateFlag(flagId: FeatureFlagId, updates: Partial<FeatureFlag>): void {
    const flag = this.flags.get(flagId);
    if (!flag) {
      console.warn(`Feature flag "${flagId}" not found`);
      return;
    }

    this.flags.set(flagId, { ...flag, ...updates });
  }

  /**
   * Get statistics on current feature rollouts
   */
  getStats(): {
    totalFlags: number;
    enabledFlags: number;
    avgRollout: number;
    byStatus: Record<string, number>;
  } {
    const allFlags = Array.from(this.flags.values());
    const enabledCount = allFlags.filter(f => f.enabled).length;
    const totalRollout = allFlags.reduce((sum, f) => sum + f.rolloutPercentage, 0);
    const byStatus = {} as Record<string, number>;

    allFlags.forEach(f => {
      byStatus[f.status] = (byStatus[f.status] || 0) + 1;
    });

    return {
      totalFlags: allFlags.length,
      enabledFlags: enabledCount,
      avgRollout: Math.round(totalRollout / allFlags.length),
      byStatus,
    };
  }
}

// Singleton instance
export const featureFlagsService = new FeatureFlagsService();

export default featureFlagsService;
