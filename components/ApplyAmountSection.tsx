"use client";

import { useState } from "react";
import type { HomeContentData } from "@/lib/data";

interface ApplyAmountSectionProps {
  content?: HomeContentData;
}

export default function ApplyAmountSection({ content }: ApplyAmountSectionProps) {
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("");
  const [installment, setInstallment] = useState("");

  const heading = content?.applyAmountHeading ?? "Get your amount\nfor fillup this form";
  const amountPlaceholder = content?.applyAmountField1Placeholder ?? "Amount";
  const monthsPlaceholder = content?.applyAmountField2Placeholder ?? "Long of months?";
  const installmentPlaceholder = content?.applyAmountField3Placeholder ?? "Installment amount.";
  const buttonText = content?.applyAmountButtonText ?? "Subscribe Now";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="commonSection applyAmoutSec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="sec_title" style={{ whiteSpace: "pre-line" }}>{heading}</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="applyamountFrom">
              <form action="#" method="post" onSubmit={handleSubmit}>
                <input
                  type="number"
                  step="any"
                  name="amount"
                  placeholder={amountPlaceholder}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <input
                  type="number"
                  step="any"
                  name="months"
                  placeholder={monthsPlaceholder}
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                />
                <input
                  type="number"
                  step="any"
                  name="installment"
                  placeholder={installmentPlaceholder}
                  value={installment}
                  onChange={(e) => setInstallment(e.target.value)}
                />
                <button className="common_btn" type="submit">
                  {buttonText}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
