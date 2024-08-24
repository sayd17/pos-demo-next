export const MAX_PRODUCT_LENGTH = 12;
export const MAX_LENGTH = 14;

export const BarcodeType = [
  { value: "UPCA", label: "UPCA" },
  { value: "I25", label: "I25" },
  { value: "C128", label: "C128" },
  { value: "EAN13", label: "EAN13" },
];

export const LabelInput = [
  {
    label: "description_label",
    classes: "col-5 col-md-3",
  },
  {
    label: "quantity_label",
    classes: "col-4 col-md-2",
  },
  {
    label: "rate_label",
    classes: "col-5 col-md-3",
  },
  {
    label: "amount_label",
    classes: "col-7 col-md-3",
  },
  {
    label: "action_label",
    classes: "col-3 col-md-1",
  },
];

export const PrintLabelInput = [
  {
    label: "name",
    type: "text",
    placeholder: "Product name",
    classes: "col-3 col-md-2",
  },
  {
    label: "code",
    type: "number",
    classes: "col-3 col-md-2",
  },
  {
    label: "unit_price",
    type: "number",
    classes: "col-3 col-md-2",
  },
  {
    label: "quantity",
    type: "number",
    classes: "col-3 col-md-2",
  },
  {
    label: "vat",
    type: "number",
    classes: "col-2 col-md-1",
  },
  {
    label: "expired_date",
    type: "date",
    classes: "col-4 col-md-2",
  },
  {
    label: "delete",
    type: "text",
    classes: "col-2 col-md-1",
  },
];

export const NotesTerms = [
  {
    label: "notes_label",
    value: "notes",
    placeholder: "Notes - any relevant information not already covered",
  },
  {
    label: "terms_label",
    value: "terms_and_conditions",
    placeholder:
      "Terms and conditions - late fees, payment methods, delivery schedule",
  },
];

export const Summary = [
  {
    label: "sub_total_label",
    value: "sub_total",
    isDisabled: true,
  },
  {
    label: "discount_label",
    value: "discount",
    isDisabled: false,
  },
  {
    label: "tax_label",
    value: "tax",
    isDisabled: false,
  },
  {
    label: "shipping_label",
    value: "shipping",
    isDisabled: false,
  },
  {
    label: "total_label",
    value: "total",
    isDisabled: true,
  },
  {
    label: "amount_paid_label",
    value: "amount_paid",
    isDisabled: false,
  },
  {
    label: "balance_due_label",
    value: "balance_due",
    isDisabled: true,
  },
  {
    label: "change_amount_label",
    value: "change_amount",
    isDisabled: true,
  },
];

// Menu list
export const MenuItems = [
  {
    name: "Products",
    url: "/",
    isPro: true,
    icon: "product.png",
  },
  {
    name: "Adjustment",
    url: "/",
    isPro: true,
    icon: "adjustment.png",
  },
  {
    name: "Purchase",
    url: "/",
    isPro: true,
    icon: "purchase.png",
  },
  {
    name: "Sale",
    url: "/",
    isPro: true,
    icon: "sale.png",
  },
  {
    name: "Due Management",
    url: "/",
    isPro: true,
    icon: "due-management.png",
  },
  {
    name: "Quotations",
    url: "/quotations",
    isPro: false,
    icon: "quotation.png",
  },
  {
    name: "Invoice",
    url: "/invoice-generate",
    isPro: false,
    icon: "invoice.png",
  },
  {
    name: "Print Label",
    url: "/print-label",
    isPro: false,
    icon: "level-print.png",
  },
  {
    name: "Expense",
    url: "/",
    isPro: true,
    icon: "expense.png",
  },
  {
    name: "Income",
    url: "/",
    isPro: true,
    icon: "income.png",
  },
  {
    name: "Cash Flow",
    url: "/",
    isPro: true,
    icon: "cash-flow.png",
  },
  {
    name: "People",
    url: "/",
    isPro: true,
    icon: "people.png",
  },
  {
    name: "Reports",
    url: "/",
    isPro: true,
    icon: "report.png",
  },
  {
    name: "Customer Points",
    url: "/",
    isPro: true,
    icon: "customerPoints.png",
  },
  {
    name: "Settings",
    url: "/",
    isPro: true,
    icon: "setting.png",
  },
];

export const InvoiceData = {
  ship_to_label: "Ship To",
  ship_from_label: "Ship From",
  po_number_label: "PO Number",
  po_number: "",
  description_label: "Description",
  quantity_label: "Quantity",
  rate_label: "Rate",
  amount_label: "Amount",
  action_label: "Action",
  notes_label: "Notes",
  notes: "",
  terms_label: "Terms and Conditions",
  terms_and_conditions: "",
  sub_total_label: "Subtotal",
  sub_total: 0,
  total_label: "Total",
  discount_label: "Discount",
  tax_label: "Tax",
  shipping_label: "Shipping",
  amount_paid_label: "Amount Paid",
  amount_paid: 0,
  payment_terms_label: "Payment Terms",
  payment_terms: "",
  date_label: "Date",
  date: "",
  due_date_label: "Due Date",
  due_date: "",
  balance_due_label: "Balance Due",
  balance_due: 0,
  change_amount_label: "Change Amount",
  change_amount: 0,
  invoice_name: "Invoice Name",
  invoice_number: 1,
  invoice_person: "",
  ship_from: "",
  ship_to: "",
  total: 0,
  tax: 0,
  discount: 0,
  shipping: 0,
  currency: "৳",
};

export const QuotationData = {
  ship_to_label: "Ship To",
  ship_from_label: "Ship From",
  po_number_label: "PO Number",
  po_number: "",
  description_label: "Description",
  quantity_label: "Quantity",
  rate_label: "Rate",
  discount_label: "Discount",
  vat_label: "Vat",
  amount_label: "Amount",
  action_label: "Action",
  notes_label: "Notes",
  notes: "",
  terms_label: "Terms and Conditions",
  terms_and_conditions: "",
  sub_total_label: "Subtotal",
  sub_total: 0,
  total_label: "Total",
  tax_label: "Tax",
  shipping_label: "Shipping",
  amount_paid_label: "Amount Paid",
  amount_paid: 0,
  payment_terms_label: "Payment Terms",
  payment_terms: "",
  date_label: "Date",
  date: "",
  due_date_label: "Due Date",
  due_date: "",
  balance_due_label: "Balance Due",
  balance_due: 0,
  change_amount_label: "Change Amount",
  change_amount: 0,
  quotation_name: "Quotation Name",
  quotation_number: 1,
  quotation_person: "",
  ship_from: "",
  ship_to: "",
  total: 0,
  tax: 0,
  discount: 0,
  shipping: 0,
  currency: "৳",
};
