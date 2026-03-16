export const roleBasedSuggestions = {
    admin: [
        "Show system usage overview",
        "List pending recruitment approvals",
        "What is the total workforce count?",
        "Show last month's payroll summary",
        "Are there any pending audit logs?"
    ],
    manager: [
        "Show my team's attendance",
        "List pending leave approvals",
        "Show project monitoring status",
        "Who is on leave today?",
        "How is my team's performance review progress?"
    ],
    employee: [
        "How many leave days do I have left?",
        "Show my attendance for this month",
        "What is my latest payslip?",
        "List upcoming company holidays",
        "Show my profile details"
    ],
    default: [
        "How can I help you today?",
        "What can this AI assistant do?",
        "Show company holidays",
        "Show HR policies"
    ]
};

export const roleBasedTips = {
    admin: "You can ask for workforce analytics, review pending recruitment requests, or check system audit logs. Ensure you follow organizational data privacy policies when accessing sensitive information.",
    manager: "Try asking about your team's current attendance, pending leave approvals, or overall project milestones. Use these insights for effective resource planning and team performance management.",
    employee: "You can ask about your remaining leave balance, view your latest payslip, or check the company holiday calendar. For your security, never share passwords or sensitive personal data in this chat.",
    default: "You can ask about leave balances, payroll summaries, upcoming holidays, or employee details. For security, never share passwords in this chat."
};

export const aiChatResponses = {
    "default": "I'm here to help with your HR queries. You can ask about leave, payroll, or attendance.",
    "leave": "You currently have 8 annual leave days remaining for this calendar year.",
    "payroll": "Your March salary is ₹45,000 with ₹3,000 deductions. Your net pay is ₹42,000.",
    "attendance": "Your attendance for March is 95%. You have been present for 20 out of 21 working days.",
    "holidays": "The next company holiday is Holi on March 25th, followed by Good Friday on March 29th.",
    "employees": "There are currently 152 employees in the system, with 12 new hires this month."
};

export const getAIResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes("leave")) return aiChatResponses.leave;
    if (msg.includes("payroll") || msg.includes("salary") || msg.includes("payslip")) return aiChatResponses.payroll;
    if (msg.includes("attendance")) return aiChatResponses.attendance;
    if (msg.includes("holiday")) return aiChatResponses.holidays;
    if (msg.includes("employee")) return aiChatResponses.employees;
    return aiChatResponses.default;
};
