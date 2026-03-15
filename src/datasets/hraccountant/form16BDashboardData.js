import { Building2, CreditCard, FileCheck, ExternalLink } from 'lucide-react';

export const form16BTransactions = [
    { id: "TXN-2045", buyer: "Rahul Sharma", seller: "Green Valley Developers", value: "₹75,00,000", tds: "₹75,000", status: "Generated", date: "Mar 15, 2026", type: "Residential Plot" },
    { id: "TXN-2051", buyer: "Priya Nair", seller: "Sunrise Properties", value: "₹60,00,000", tds: "₹60,000", status: "Pending", date: "Mar 12, 2026", type: "2BHK Apartment" },
    { id: "TXN-2058", buyer: "Amit Verma", seller: "Urban Dwellings", value: "₹1,25,00,000", tds: "₹1,25,000", status: "Filed", date: "Mar 10, 2026", type: "Commercial Space" },
    { id: "TXN-2062", buyer: "Sneha Gupta", seller: "Skyline Builders", value: "₹45,00,000", tds: "₹45,000", status: "Generated", date: "Mar 08, 2026", type: "1BHK Studio" },
];

export const form16BFilingRecords = [
    { id: "TXN-2045", challan: "CHL-88291", filingDate: "Mar 15", status: "Paid" },
    { id: "TXN-2051", challan: "Pending", filingDate: "Pending", status: "Processing" },
    { id: "TXN-2058", challan: "CHL-88114", filingDate: "Mar 11", status: "Paid" },
];

export const form16BTimeline = [
    { event: "Property transaction recorded", time: "2 hours ago", details: "Rahul Sharma | ₹75L", icon: Building2, color: "text-blue-500" },
    { event: "TDS deducted for property purchase", time: "5 hours ago", details: "Priya Nair | ₹60k", icon: CreditCard, color: "text-purple-500" },
    { event: "Form 16B generated", time: "1 day ago", details: "TXN-2045", icon: FileCheck, color: "text-green-500" },
    { event: "Tax filing submitted", time: "2 days ago", details: "Urban Dwellings | TXN-2058", icon: ExternalLink, color: "text-indigo-500" },
];
