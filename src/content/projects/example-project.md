---
title: "Network Traffic Anomaly Detector"
slug: "example-project"
summary: "A Python daemon that detects statistical anomalies in live network traffic without relying on a signature database."
# heroImage: "/images/example-project.png"
techStack: ["Python", "Scapy", "Pandas", "Docker", "Linux"]
role: "Solo project"
date: 2024-11-15
githubUrl: "https://github.com/Tentacular8/network-anomaly-detector"
# demoUrl: "https://your-demo-url.com"
featured: true
draft: false
---

## The problem

Enterprise networks produce millions of packets per hour. Signature-based intrusion detection tools work well against known attack patterns but are blind to novel threats and insider behavior that has never been catalogued. I wanted a detector that flags *unusual behavior* rather than *known-bad behavior* — one that adapts to each network's normal traffic without manual threshold tuning.

## My approach

The tool uses [Scapy](https://scapy.net/) to capture live packets on a configurable interface. Every 60 seconds, it computes a snapshot across five metrics:

- **Packets per second** — catches floods and large-scale port scans
- **Average packet size** — flags tunneling and covert channels
- **Protocol distribution** — detects unexpected protocol use (e.g. IRC on a corporate LAN)
- **Unique destination ports per source IP** — catches horizontal scanning
- **Inbound/outbound byte ratio** — flags potential exfiltration

A rolling 24-hour window of 60-second snapshots builds the baseline for each metric. Any deviation beyond two standard deviations triggers an alert: anomalous metric, observed vs. expected value, timestamp, and a five-second `pcap` capture for manual review.

The service runs in Docker. Because raw socket access is required, it uses `--cap-add NET_RAW --cap-add NET_ADMIN` rather than `--privileged` — documented explicitly in the README so a security auditor reading the deployment config understands the exact surface area.

## Challenges

False positives during predictable traffic spikes were the main problem. Morning login bursts, nightly backups, and scheduled video calls all triggered alerts with static thresholds. I fixed this by adding a **day-of-week + hour-of-day** dimension to the baseline: Monday 9 AM traffic is compared to other Monday 9 AM baselines, not to Sunday 3 AM. Alert volume fell roughly 80% with no change in true-positive rate.

Running Scapy's `sniff()` on the main thread also blocked the analysis loop. The solution was offloading packet capture to a subprocess writing into a `multiprocessing.Queue`, which cleanly separated capture from analysis and made unit tests possible without sending actual packets.

## What I learned

Statistical anomaly detection works best as a *layer*, not a *replacement*. It surfaces behavioral deviations that signatures miss, but those deviations need human review to distinguish real threats from misconfigured services. Building a suppression list for known-noisy hosts was necessary to keep the alert feed actionable.

The containerization experience reinforced something I now treat as a rule: document any elevated capability (`NET_RAW`, `SYS_ADMIN`, etc.) at the point of use — in the `docker run` command, in the Compose file, and in the README — not just in a separate security doc that drifts out of sync.
