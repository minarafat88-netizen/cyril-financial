"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, ArrowRight, CheckCircle2, AlertCircle,
  User, Briefcase, Building, Home, HelpCircle, FileText, Award, Users, CreditCard
} from "lucide-react";

export default function CompleteForm1003Page() {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // حالة نموذج البيانات الشامل لجميع أقسام Form 1003 بدون حذف أي حقل
  const [formData, setFormData] = useState({
    // Header (To be completed by Lender)
    lenderLoanNo: "",
    agencyCaseNo: "",

    // Section 1a: Borrower Personal Information
    firstName: "",
    middleName: "",
    lastName: "",
    suffix: "",
    ssnOrItin: "",
    alternateNames: "",
    dob: "",
    citizenship: "US Citizen",
    creditType: "Individual",
    totalJointBorrowers: "1",
    jointBorrowerNames: "",
    maritalStatus: "Married",
    dependentsCount: "0",
    dependentsAges: "",
    homePhone: "",
    cellPhone: "",
    workPhone: "",
    email: "",
    currentStreet: "",
    currentUnit: "",
    currentCity: "",
    currentState: "",
    currentZip: "",
    currentCountry: "USA",
    yearsAtCurrentAddress: "",
    monthsAtCurrentAddress: "",
    housingStatus: "Own",
    monthlyRent: "",
    formerStreet: "",
    formerUnit: "",
    formerCity: "",
    formerState: "",
    formerZip: "",
    formerCountry: "USA",
    yearsAtFormerAddress: "",
    monthsAtFormerAddress: "",
    mailingAddressDifferent: false,

    // Section 1b: Current Employment / Self-Employment
    employerName: "",
    employerPhone: "",
    employerStreet: "",
    employerUnit: "",
    employerCity: "",
    employerState: "",
    employerZip: "",
    positionTitle: "",
    startDate: "",
    yearsInLineOfWork: "",
    monthsInLineOfWork: "",
    employedByRelatedParty: false,
    selfEmployed: false,
    ownershipShare: "Less than 25%",
    baseIncome: "",
    overtimeIncome: "",
    bonusIncome: "",
    commissionIncome: "",
    militaryEntitlements: "",
    otherIncome1b: "",

    // Section 1e: Income from Other Sources
    otherIncomeSource: "None",
    otherIncomeAmount: "",

    // Section 2a & 2b: Assets
    assetType: "Checking",
    financialInstitution: "",
    accountNumber: "",
    assetMarketValue: "",

    // Section 2c & 2d: Liabilities
    liabilityType: "Revolving",
    companyName: "",
    liabilityAccountNo: "",
    unpaidBalance: "",
    paidOffBeforeClosing: false,
    monthlyPayment: "",

    // Section 3: Real Estate Owned
    propertyAddress3a: "",
    propertyValue3a: "",
    propertyStatus3a: "Retained",
    intendedOccupancy3a: "Primary Residence",
    monthlyInsuranceTaxes3a: "",
    monthlyRentalIncome3a: "",

    // Section 4: Loan and Property Information
    loanAmount: "",
    loanPurpose: "Purchase",
    propertyAddress4a: "",
    unitsCount: "1",
    propertyValue4a: "",
    occupancy4a: "Primary Residence",
    mixedUseProperty: "NO",
    manufacturedHome: "NO",

    // Section 5: Declarations
    primaryResidence5a: "YES",
    ownershipInterestLast3Years: "NO",
    familyAffiliationSeller: "NO",
    undisclosedBorrowedMoney: "NO",
    applyingOtherMortgage: "NO",
    applyingNewCredit: "NO",
    priorityLien: "NO",
    cosignerDebt: "NO",
    outstandingJudgments: "NO",
    delinquentFederalDebt: "NO",
    lawsuitLiability: "NO",
    conveyedTitleForeclosure: "NO",
    preForeclosureSale: "NO",
    foreclosedProperty: "NO",
    declaredBankruptcy: "NO",
    bankruptcyType: "Chapter 7",

    // Section 6: Acknowledgments
    agreedToTerms: false,

    // Section 7: Military Service
    militaryService: "NO",
    militaryStatus: "",

    // Section 8: Demographic Information
    ethnicity: "Not Hispanic or Latino",
    race: "White",
    sex: "Male",

    // Section 9: Loan Originator Information
    originatorOrgName: "Cyril Financial Group",
    originatorNMLS: "123456",
    originatorName: "Mina Raafat",
    originatorPhone: "+1 (949) 000-0000"
  });

  // قائمة الحقول الإجبارية ورقم التبويب الخاص بكل منها
  const requiredFieldsMap: { name: keyof typeof formData; tab: number; label: string }[] = [
    // Tab 1
    { name: "firstName", tab: 1, label: "First Name" },
    { name: "lastName", tab: 1, label: "Last Name" },
    { name: "ssnOrItin", tab: 1, label: "Social Security Number / ITIN" },
    { name: "dob", tab: 1, label: "Date of Birth" },
    { name: "cellPhone", tab: 1, label: "Cell Phone" },
    { name: "email", tab: 1, label: "Email Address" },
    { name: "currentStreet", tab: 1, label: "Current Street Address" },
    { name: "currentCity", tab: 1, label: "City" },
    { name: "currentState", tab: 1, label: "State" },
    { name: "currentZip", tab: 1, label: "ZIP Code" },
    { name: "employerName", tab: 1, label: "Employer / Business Name" },
    { name: "positionTitle", tab: 1, label: "Position / Title" },
    { name: "baseIncome", tab: 1, label: "Base Monthly Income" },
    // Tab 4
    { name: "loanAmount", tab: 4, label: "Loan Amount Requested" },
    { name: "propertyValue4a", tab: 4, label: "Property Value" },
    { name: "propertyAddress4a", tab: 4, label: "Subject Property Address" },
    // Tab 6
    { name: "agreedToTerms", tab: 6, label: "Terms Agreement" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: val }));

    // مسح تنبيه الخطأ بمجرد كتابة العميل في الحقل
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  // دالة الفحص الشاملة عند الإرسال النهائى
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let firstMissingTab: number | null = null;

    requiredFieldsMap.forEach((field) => {
      const val = formData[field.name];
      const isEmpty = typeof val === "boolean" ? !val : !val || String(val).trim() === "";

      if (isEmpty) {
        newErrors[field.name] = `This field is required`;
        if (firstMissingTab === null) {
          firstMissingTab = field.tab;
        }
      }
    });

    setErrors(newErrors);

    // إذا وجد بيان مفقود يتم توجيه العميل فوراً إلى التبويب الخاص به
    if (firstMissingTab !== null) {
      setActiveTab(firstMissingTab);
      return false;
    }

    return true;
  };

  // دالة التنقل بين التبويبات مع فحص التبويب الحالي
  const handleNextTab = (targetTab: number) => {
    const currentTabFields = requiredFieldsMap.filter((f) => f.tab === activeTab);
    const tabErrors: Record<string, string> = { ...errors };
    let hasError = false;

    currentTabFields.forEach((field) => {
      const val = formData[field.name];
      const isEmpty = typeof val === "boolean" ? !val : !val || String(val).trim() === "";

      if (isEmpty) {
        tabErrors[field.name] = `This field is required`;
        hasError = true;
      }
    });

    if (hasError) {
      setErrors(tabErrors);
      return; // يمنع الانتقال للتبويب التالي في حال وجود حقل ناقص
    }

    setActiveTab(targetTab);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const tabs = [
    { id: 1, title: "1. Borrower Info", icon: User },
    { id: 2, title: "2. Assets & Debts", icon: CreditCard },
    { id: 3, title: "3. Real Estate", icon: Home },
    { id: 4, title: "4. Loan & Property", icon: Building },
    { id: 5, title: "5. Declarations", icon: HelpCircle },
    { id: 6, title: "6. Terms & Agreements", icon: FileText },
    { id: 7, title: "7. Military", icon: Award },
    { id: 8, title: "8. Demographics", icon: Users },
    { id: 9, title: "9. Originator", icon: Briefcase }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-navy flex flex-col">
      <Header />

      <main className="flex-1 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Main Title Banner */}
          <div className="bg-navy text-white p-8 rounded-3xl shadow-glass space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" /> Official Fannie Mae Form 1003 / Freddie Mac Form 65
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white">
              Uniform Residential Loan Application (Form 1003)
            </h1>
            <p className="text-gray-300 text-xs lg:text-sm max-w-3xl leading-relaxed">
              Complete all 9 sections below to process your formal residential mortgage application.
            </p>
          </div>

          {/* شريط تنبيه بالأخطاء والمستندات الناقصة */}
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-2xl text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              <div>
                <span className="font-bold">Incomplete Application:</span> Please fill in all required fields highlighted in red under Tab {activeTab} before submitting.
              </div>
            </div>
          )}

          {/* Tab Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const hasTabError = requiredFieldsMap.some((f) => f.tab === tab.id && errors[f.name]);
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-navy text-white shadow-md"
                      : hasTabError
                      ? "bg-red-50 text-red-600 border border-red-300"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.title}</span>
                  {hasTabError && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                </button>
              );
            })}
          </div>

          {submitted ? (
            <div className="bg-white p-12 rounded-3xl shadow-luxury border border-gray-100 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-navy">Form 1003 Application Transmitted Successfully!</h2>
              <p className="text-gray-600 text-sm max-w-md mx-auto">
                Thank you, {formData.firstName}. Your full Uniform Residential Loan Application has been submitted to Cyril Financial Group.
              </p>
              <Link href="/" className="inline-block pt-4">
                <Button className="bg-navy hover:bg-navy-light text-white font-semibold px-6 py-3 rounded-xl text-xs">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white p-8 lg:p-10 rounded-3xl shadow-luxury border border-gray-100">
              
              {/* TAB 1: SECTION 1 - BORROWER INFORMATION */}
              {activeTab === 1 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 1: Borrower Information</h2>
                    <p className="text-xs text-gray-500">Personal details, contact information, address history, and monthly income breakdown.</p>
                  </div>

                  {/* 1a. Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">1a. Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">First Name *</label>
                        <input 
                          type="text" 
                          name="firstName" 
                          value={formData.firstName} 
                          onChange={handleChange} 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.firstName ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.firstName && <span className="text-[10px] text-red-500 mt-1 block">{errors.firstName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Middle Name</label>
                        <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Last Name *</label>
                        <input 
                          type="text" 
                          name="lastName" 
                          value={formData.lastName} 
                          onChange={handleChange} 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.lastName ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.lastName && <span className="text-[10px] text-red-500 mt-1 block">{errors.lastName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Suffix</label>
                        <input type="text" name="suffix" value={formData.suffix} onChange={handleChange} placeholder="Jr., Sr., III" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Social Security Number / ITIN *</label>
                        <input 
                          type="password" 
                          name="ssnOrItin" 
                          value={formData.ssnOrItin} 
                          onChange={handleChange} 
                          placeholder="XXX-XX-XXXX" 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.ssnOrItin ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.ssnOrItin && <span className="text-[10px] text-red-500 mt-1 block">{errors.ssnOrItin}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Date of Birth (mm/dd/yyyy) *</label>
                        <input 
                          type="date" 
                          name="dob" 
                          value={formData.dob} 
                          onChange={handleChange} 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.dob ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.dob && <span className="text-[10px] text-red-500 mt-1 block">{errors.dob}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Citizenship</label>
                        <select name="citizenship" value={formData.citizenship} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="US Citizen">U.S. Citizen</option>
                          <option value="Permanent Resident Alien">Permanent Resident Alien</option>
                          <option value="Non-Permanent Resident Alien">Non-Permanent Resident Alien</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Type of Credit</label>
                        <select name="creditType" value={formData.creditType} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Individual">Individual Credit</option>
                          <option value="Joint">Joint Credit</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Marital Status</label>
                        <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Married">Married</option>
                          <option value="Separated">Separated</option>
                          <option value="Unmarried">Unmarried (Single, Divorced, Widowed)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Dependents Count</label>
                        <input type="number" name="dependentsCount" value={formData.dependentsCount} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Cell Phone *</label>
                        <input 
                          type="tel" 
                          name="cellPhone" 
                          value={formData.cellPhone} 
                          onChange={handleChange} 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.cellPhone ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.cellPhone && <span className="text-[10px] text-red-500 mt-1 block">{errors.cellPhone}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Work Phone</label>
                        <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Email Address *</label>
                        <input 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleChange} 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.email ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.email && <span className="text-[10px] text-red-500 mt-1 block">{errors.email}</span>}
                      </div>
                    </div>

                    {/* Current Address */}
                    <div className="pt-2">
                      <label className="block text-xs font-bold text-navy mb-1">Current Street Address & Unit # *</label>
                      <input 
                        type="text" 
                        name="currentStreet" 
                        value={formData.currentStreet} 
                        onChange={handleChange} 
                        placeholder="123 Main St, Apt 4B" 
                        className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                          errors.currentStreet ? "border-red-500 bg-red-50/50" : "border-gray-200"
                        }`} 
                      />
                      {errors.currentStreet && <span className="text-[10px] text-red-500 mt-1 block">{errors.currentStreet}</span>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">City *</label>
                        <input type="text" name="currentCity" value={formData.currentCity} onChange={handleChange} className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${errors.currentCity ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.currentCity && <span className="text-[10px] text-red-500 mt-1 block">{errors.currentCity}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">State *</label>
                        <input type="text" name="currentState" value={formData.currentState} onChange={handleChange} className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${errors.currentState ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.currentState && <span className="text-[10px] text-red-500 mt-1 block">{errors.currentState}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">ZIP Code *</label>
                        <input type="text" name="currentZip" value={formData.currentZip} onChange={handleChange} className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${errors.currentZip ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.currentZip && <span className="text-[10px] text-red-500 mt-1 block">{errors.currentZip}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Housing Status</label>
                        <select name="housingStatus" value={formData.housingStatus} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Own">Own</option>
                          <option value="Rent">Rent</option>
                          <option value="No Expense">No Primary Housing Expense</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 1b. Current Employment */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">1b. Current Employment / Self-Employment & Income</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Employer / Business Name *</label>
                        <input type="text" name="employerName" value={formData.employerName} onChange={handleChange} className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${errors.employerName ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.employerName && <span className="text-[10px] text-red-500 mt-1 block">{errors.employerName}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Position / Title *</label>
                        <input type="text" name="positionTitle" value={formData.positionTitle} onChange={handleChange} className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${errors.positionTitle ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.positionTitle && <span className="text-[10px] text-red-500 mt-1 block">{errors.positionTitle}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Base Monthly Income ($) *</label>
                        <input type="number" name="baseIncome" value={formData.baseIncome} onChange={handleChange} placeholder="e.g. 6500" className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs font-bold text-navy outline-none ${errors.baseIncome ? "border-red-500 bg-red-50/50" : "border-gray-200"}`} />
                        {errors.baseIncome && <span className="text-[10px] text-red-500 mt-1 block">{errors.baseIncome}</span>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Overtime Monthly ($)</label>
                        <input type="number" name="overtimeIncome" value={formData.overtimeIncome} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Bonus Monthly ($)</label>
                        <input type="number" name="bonusIncome" value={formData.bonusIncome} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Commission Monthly ($)</label>
                        <input type="number" name="commissionIncome" value={formData.commissionIncome} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="button" onClick={() => handleNextTab(2)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">
                      Next: Assets & Debts <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 2: SECTION 2 - FINANCIAL ASSETS & LIABILITIES */}
              {activeTab === 2 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 2: Financial Information - Assets and Liabilities</h2>
                    <p className="text-xs text-gray-500">Bank accounts, retirement funds, credit cards, loans, and other financial obligations.</p>
                  </div>

                  {/* 2a. Assets */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">2a. Assets - Bank Accounts, Retirement & Other</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Account Type</label>
                        <select name="assetType" value={formData.assetType} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Checking">Checking</option>
                          <option value="Savings">Savings</option>
                          <option value="Money Market">Money Market</option>
                          <option value="CD">Certificate of Deposit (CD)</option>
                          <option value="Mutual Fund">Mutual Fund</option>
                          <option value="Stocks">Stocks</option>
                          <option value="Retirement">Retirement (401k, IRA)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Financial Institution</label>
                        <input type="text" name="financialInstitution" value={formData.financialInstitution} onChange={handleChange} placeholder="e.g. Chase Bank" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Account Number</label>
                        <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="XXXX-XXXX" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Market Value ($)</label>
                        <input type="number" name="assetMarketValue" value={formData.assetMarketValue} onChange={handleChange} placeholder="e.g. 50000" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs font-bold text-navy" />
                      </div>
                    </div>
                  </div>

                  {/* 2c. Liabilities */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">2c. Liabilities - Credit Cards, Debts, & Leases</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Liability Type</label>
                        <select name="liabilityType" value={formData.liabilityType} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Revolving">Revolving (Credit Cards)</option>
                          <option value="Installment">Installment (Car/Student Loans)</option>
                          <option value="Lease">Lease</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Company Name</label>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="e.g. Bank of America" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Unpaid Balance ($)</label>
                        <input type="number" name="unpaidBalance" value={formData.unpaidBalance} onChange={handleChange} placeholder="e.g. 12000" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Monthly Payment ($)</label>
                        <input type="number" name="monthlyPayment" value={formData.monthlyPayment} onChange={handleChange} placeholder="e.g. 350" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs font-bold text-navy" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(1)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(3)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Real Estate <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 3: SECTION 3 - REAL ESTATE OWNED */}
              {activeTab === 3 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 3: Financial Information - Real Estate</h2>
                    <p className="text-xs text-gray-500">Properties you currently own and active mortgage obligations on them.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">3a. Property You Own</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Property Address</label>
                        <input type="text" name="propertyAddress3a" value={formData.propertyAddress3a} onChange={handleChange} placeholder="Street, City, State, ZIP" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Property Value ($)</label>
                        <input type="number" name="propertyValue3a" value={formData.propertyValue3a} onChange={handleChange} placeholder="e.g. 650000" className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs font-bold text-navy" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Intended Occupancy</label>
                        <select name="intendedOccupancy3a" value={formData.intendedOccupancy3a} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Primary Residence">Primary Residence</option>
                          <option value="Second Home">Second Home</option>
                          <option value="Investment">Investment Property</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(2)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(4)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Loan & Property <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 4: SECTION 4 - LOAN AND PROPERTY INFORMATION */}
              {activeTab === 4 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 4: Loan and Property Information</h2>
                    <p className="text-xs text-gray-500">Loan purpose, property details, and expected rental income or gifts.</p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider">4a. Loan and Property Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Loan Amount Requested ($) *</label>
                        <input 
                          type="number" 
                          name="loanAmount" 
                          value={formData.loanAmount} 
                          onChange={handleChange} 
                          placeholder="e.g. 450000" 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs font-bold text-navy outline-none ${
                            errors.loanAmount ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.loanAmount && <span className="text-[10px] text-red-500 mt-1 block">{errors.loanAmount}</span>}
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Loan Purpose</label>
                        <select name="loanPurpose" value={formData.loanPurpose} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                          <option value="Purchase">Purchase</option>
                          <option value="Refinance">Refinance</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1">Property Value ($) *</label>
                        <input 
                          type="number" 
                          name="propertyValue4a" 
                          value={formData.propertyValue4a} 
                          onChange={handleChange} 
                          placeholder="e.g. 550000" 
                          className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                            errors.propertyValue4a ? "border-red-500 bg-red-50/50" : "border-gray-200"
                          }`} 
                        />
                        {errors.propertyValue4a && <span className="text-[10px] text-red-500 mt-1 block">{errors.propertyValue4a}</span>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Subject Property Address *</label>
                      <input 
                        type="text" 
                        name="propertyAddress4a" 
                        value={formData.propertyAddress4a} 
                        onChange={handleChange} 
                        placeholder="Street Address, City, State, ZIP" 
                        className={`w-full p-2.5 bg-gray-50 border rounded-xl text-xs outline-none ${
                          errors.propertyAddress4a ? "border-red-500 bg-red-50/50" : "border-gray-200"
                        }`} 
                      />
                      {errors.propertyAddress4a && <span className="text-[10px] text-red-500 mt-1 block">{errors.propertyAddress4a}</span>}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(3)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(5)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Declarations <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 5: SECTION 5 - DECLARATIONS */}
              {activeTab === 5 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 5: Declarations</h2>
                    <p className="text-xs text-gray-500">Legal questions about property ownership, liabilities, and past credit history.</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: "primaryResidence5a", text: "A. Will you occupy the property as your primary residence?" },
                      { key: "ownershipInterestLast3Years", text: "Have you had an ownership interest in another property in the last three years?" },
                      { key: "familyAffiliationSeller", text: "B. Do you have a family relationship or business affiliation with the seller of the property?" },
                      { key: "undisclosedBorrowedMoney", text: "C. Are you borrowing any money for this real estate transaction that has not been disclosed?" },
                      { key: "applyingOtherMortgage", text: "D. Have you or will you be applying for a mortgage loan on another property on or before closing?" },
                      { key: "cosignerDebt", text: "F. Are you a co-signer or guarantor on any debt or loan not disclosed on this application?" },
                      { key: "outstandingJudgments", text: "G. Are there any outstanding judgments against you?" },
                      { key: "delinquentFederalDebt", text: "H. Are you currently delinquent or in default on a Federal debt?" },
                      { key: "declaredBankruptcy", text: "M. Have you declared bankruptcy within the past 7 years?" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-xs font-semibold text-navy max-w-xl">{item.text}</span>
                        <select
                          name={item.key}
                          value={(formData as any)[item.key]}
                          onChange={handleChange}
                          className="p-2 bg-white border rounded-lg text-xs font-bold text-navy"
                        >
                          <option value="NO">NO</option>
                          <option value="YES">YES</option>
                        </select>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(4)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(6)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Terms & Agreements <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 6: SECTION 6 - ACKNOWLEDGMENTS AND AGREEMENTS */}
              {activeTab === 6 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 6: Acknowledgments and Agreements</h2>
                    <p className="text-xs text-gray-500">Legal disclosures, electronic records consent, and information sharing authorization.</p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-2xl border text-xs text-gray-600 leading-relaxed space-y-2">
                    <p>By submitting this application, you acknowledge and represent that the information provided is true, accurate, and complete as of today's date. Intentional misrepresentation may result in civil or criminal penalties under Federal law (18 U.S.C. § 1001).</p>
                    <p>You authorize Cyril Financial Group and loan participants to obtain consumer credit reports and perform necessary underwriting verification.</p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${errors.agreedToTerms ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-100"}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        name="agreedToTerms" 
                        checked={formData.agreedToTerms} 
                        onChange={handleChange} 
                        className="w-4 h-4 text-emerald-600 rounded cursor-pointer" 
                      />
                      <label className="text-xs font-bold text-navy">I agree to all legal terms, electronic records signatures, and disclosures outlined in Section 6. *</label>
                    </div>
                    {errors.agreedToTerms && <span className="text-[10px] text-red-500 mt-2 block">{errors.agreedToTerms}</span>}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(5)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(7)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Military Service <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 7: SECTION 7 - MILITARY SERVICE */}
              {activeTab === 7 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 7: Military Service</h2>
                    <p className="text-xs text-gray-500">Questions regarding active duty, veteran status, or surviving spouse benefits.</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-2">Did you (or your deceased spouse) ever serve, or are you currently serving, in the United States Armed Forces?</label>
                      <select name="militaryService" value={formData.militaryService} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                        <option value="NO">NO</option>
                        <option value="YES">YES</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(6)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(8)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Demographics <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 8: SECTION 8 - DEMOGRAPHIC INFORMATION */}
              {activeTab === 8 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 8: Demographic Information</h2>
                    <p className="text-xs text-gray-500">Collected for fair housing compliance (HMDA regulations).</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Ethnicity</label>
                      <select name="ethnicity" value={formData.ethnicity} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                        <option value="Hispanic or Latino">Hispanic or Latino</option>
                        <option value="Not Hispanic or Latino">Not Hispanic or Latino</option>
                        <option value="I do not wish to provide">I do not wish to provide this information</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Race</label>
                      <select name="race" value={formData.race} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                        <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                        <option value="Asian">Asian</option>
                        <option value="Black or African American">Black or African American</option>
                        <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                        <option value="White">White</option>
                        <option value="I do not wish to provide">I do not wish to provide this information</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Sex</label>
                      <select name="sex" value={formData.sex} onChange={handleChange} className="w-full p-2.5 bg-gray-50 border rounded-xl text-xs">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="I do not wish to provide">I do not wish to provide this information</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button type="button" onClick={() => setActiveTab(7)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="button" onClick={() => handleNextTab(9)} className="bg-navy text-white text-xs px-6 py-3 rounded-xl flex items-center gap-2">Next: Originator <ArrowRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {/* TAB 9: SECTION 9 - LOAN ORIGINATOR INFORMATION */}
              {activeTab === 9 && (
                <div className="space-y-8">
                  <div className="border-b pb-4">
                    <h2 className="text-xl font-bold text-navy">Section 9: Loan Originator Information</h2>
                    <p className="text-xs text-gray-500">Details of the financial institution and loan originator handling your file.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Organization Name</label>
                      <input type="text" name="originatorOrgName" value={formData.originatorOrgName} readOnly className="w-full p-2.5 bg-gray-100 border rounded-xl text-xs font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Organization NMLSR ID#</label>
                      <input type="text" name="originatorNMLS" value={formData.originatorNMLS} readOnly className="w-full p-2.5 bg-gray-100 border rounded-xl text-xs font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Loan Originator Name</label>
                      <input type="text" name="originatorName" value={formData.originatorName} readOnly className="w-full p-2.5 bg-gray-100 border rounded-xl text-xs font-bold text-navy" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-navy mb-1">Loan Originator Phone</label>
                      <input type="text" name="originatorPhone" value={formData.originatorPhone} readOnly className="w-full p-2.5 bg-gray-100 border rounded-xl text-xs font-bold text-navy" />
                    </div>
                  </div>

                  <div className="pt-6 border-t flex justify-between items-center">
                    <Button type="button" onClick={() => setActiveTab(8)} className="bg-gray-200 text-navy text-xs px-6 py-3 rounded-xl">Back</Button>
                    <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-md flex items-center gap-2 text-xs">
                      Submit Official Form 1003 Application <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>
      </main>
    </div>
  );
}