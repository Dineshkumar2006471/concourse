# Security Policy

## Supported Versions
Only the latest branch (`main`) is actively supported with security updates.

## Reporting a Vulnerability
If you discover any security vulnerability in Concourse (e.g., exposed API keys, Firebase misconfigurations, XSS), please DO NOT report it via public GitHub issues. 

Instead, please send an email to the repository owner. We will ensure the issue is addressed and a patch is released within 48 hours.

## Firebase Security Rules
Concourse relies on Firebase Firestore for real-time state. All deployments MUST have Firestore Security Rules enabled to prevent unauthorized read/writes outside of the Simulation Engine.
