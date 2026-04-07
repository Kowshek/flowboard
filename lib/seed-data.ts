// Fake customer seed data — 50 customers with a growth narrative

export type SeedCustomer = {
  name: string;
  email: string;
  company: string;
  plan: "starter" | "pro" | "enterprise";
  mrr: number;
  status: "active" | "churned" | "trial";
  joinedAt: Date;
};

const firstNames = [
  "James", "Sarah", "Michael", "Emma", "David", "Olivia", "Daniel", "Sophia",
  "Lucas", "Ava", "Ethan", "Isabella", "Noah", "Mia", "Liam", "Charlotte",
  "Mason", "Amelia", "Logan", "Harper", "Aiden", "Evelyn", "Carter", "Abigail",
  "Ryan", "Emily", "Jackson", "Elizabeth", "Owen", "Sofia",
];

const lastNames = [
  "Anderson", "Mitchell", "Thompson", "Garcia", "Martinez", "Robinson", "Clark",
  "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez",
  "King", "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker",
  "Nelson", "Carter", "Morgan", "Perez", "Turner", "Phillips", "Campbell",
];

const companies = [
  "Acme Corp", "Brightwave", "Cloudpeak", "Datastream", "Edgepoint",
  "Flowsync", "Gridwork", "Helixport", "Ionspark", "Jumpscale",
  "Kinetic Labs", "Lighthouse IO", "Matrixflow", "Nexuspoint", "Orbitsync",
  "Peakline", "Quantum Soft", "Rivergate", "Skybridge", "Testforge",
  "Ultraspan", "Vectorfield", "Wavefront", "Xenith Tech", "Yieldbase",
  "Zeropoint", "Alphaforge", "Betawave", "Corepath", "Deltaflow",
  "Echogate", "Fusionworks", "Graphcore", "Hyperloop", "Infoscale",
  "Jetstream", "Keystroke", "Levelup", "Micronode", "Nanogate",
  "Opentrack", "Pulseline", "Quickscale", "Rootbase", "Sourcecode",
  "Titanflow", "Unitybridge", "Vertexpoint", "Webhive", "Xenogate",
];

const planMrrRanges: Record<string, [number, number]> = {
  starter: [0, 49],
  pro: [49, 149],
  enterprise: [149, 299],
};

function randomBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function daysAgo(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
}

// Build 50 customers. Earlier joiners skew to starter/trial;
// more recent ones skew to pro/enterprise to show growth.
export const seedCustomers: SeedCustomer[] = Array.from(
  { length: 50 },
  (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const company = companies[i];
    const slug = company.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Older customers (higher index in chronological order = earlier join)
    const joinDaysAgo = randomBetween(
      Math.floor((50 - i) * 6),
      Math.floor((50 - i) * 7)
    );

    // Early customers are more likely to be on starter or churned
    let plan: SeedCustomer["plan"];
    let status: SeedCustomer["status"];

    if (i < 10) {
      // Oldest customers — mix of churned / long-running starters
      plan = Math.random() < 0.4 ? "starter" : Math.random() < 0.6 ? "pro" : "enterprise";
      status = Math.random() < 0.3 ? "churned" : "active";
    } else if (i < 30) {
      // Mid-period — mostly active, more pro
      plan = Math.random() < 0.3 ? "starter" : Math.random() < 0.6 ? "pro" : "enterprise";
      status = Math.random() < 0.1 ? "churned" : Math.random() < 0.05 ? "trial" : "active";
    } else {
      // Recent customers — skew pro/enterprise, many in trial
      plan = Math.random() < 0.15 ? "starter" : Math.random() < 0.5 ? "pro" : "enterprise";
      status = Math.random() < 0.2 ? "trial" : "active";
    }

    const [mrrMin, mrrMax] = planMrrRanges[plan];
    const mrr = status === "churned" ? 0 : status === "trial" ? 0 : randomBetween(mrrMin, mrrMax);

    return {
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${slug}.com`,
      company,
      plan,
      mrr,
      status,
      joinedAt: daysAgo(joinDaysAgo),
    };
  }
);

// Monthly metrics for the last 12 months — tells a growth story
export type MonthlyMetric = {
  month: string;
  mrr: number;
  users: number;
  churn: number;
  revenue: number;
};

export const monthlyMetrics: MonthlyMetric[] = [
  { month: "May 2025",  mrr: 7_200,  users: 89,  churn: 5.8, revenue: 8_400  },
  { month: "Jun 2025",  mrr: 8_100,  users: 98,  churn: 5.2, revenue: 9_300  },
  { month: "Jul 2025",  mrr: 9_400,  users: 112, churn: 4.9, revenue: 10_800 },
  { month: "Aug 2025",  mrr: 10_200, users: 121, churn: 4.6, revenue: 11_700 },
  { month: "Sep 2025",  mrr: 11_100, users: 133, churn: 4.3, revenue: 12_700 },
  { month: "Oct 2025",  mrr: 11_900, users: 140, churn: 4.1, revenue: 13_600 },
  { month: "Nov 2025",  mrr: 12_800, users: 150, churn: 3.8, revenue: 14_600 },
  { month: "Dec 2025",  mrr: 13_500, users: 158, churn: 3.6, revenue: 15_400 },
  { month: "Jan 2026",  mrr: 14_300, users: 168, churn: 3.4, revenue: 16_300 },
  { month: "Feb 2026",  mrr: 15_400, users: 180, churn: 3.1, revenue: 17_500 },
  { month: "Mar 2026",  mrr: 16_800, users: 193, churn: 2.9, revenue: 19_100 },
  { month: "Apr 2026",  mrr: 18_200, users: 210, churn: 2.6, revenue: 20_700 },
];
