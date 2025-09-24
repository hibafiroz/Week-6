// HTTPS:
//stands for HyperText Transfer Protocol Secure
//The HTTPS module is a secure version of the HTTP module providing encrypted communication between clients and servers
//Without HTTPS, data is sent in plain text which is vulnerable to Man-in-the-Middle(MITM) attacks

//why its important:
//Authenticates Servers: it verifies that clients are communicating with the intended server
// Privacy: HTTPS encrypts sensitive information like passwordsd and personal data
// Integrity: Prevents data from being modified

//The main difference in usage is that HTTPS requires SSL/TLS certificates to establish secure connections, while HTTP does not

//Even with HTTPS, some browser-side attacks—like clickjacking or XSS—require additional protection.
//thats where security headers come in:
// they tell browsers how to behave and what to block

// |              Header                          |                      Purpose                                                                                                                                             
// |                                              |
// |   HSTS   (Strict-Transport-Security)         | Forces the browser to use HTTPS only
// |   Content-Security-Policy (CSP)              | Controls allowed content sources (scripts, images, styles). Helps prevent XSS by disallowing untrusted sources
// |   X-Content-Type-Options: nosniff            | Prevents MIME type sniffing, reducing file-based attacks
// |   X-Frame-Options   (or CSP frame-ancestors) | Prevents clickjacking by disallowing framing in other sites
// |   Referrer-Policy                            | Controls how much referral info is sent when navigating across sites—protecting privacy

//setting up:
//import: 
const https = require('https');