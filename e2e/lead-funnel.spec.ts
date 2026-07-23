import { test, expect } from "@playwright/test";

test("complete mortgage lead qualification funnel flow", async ({ page }) => {
  await page.goto("/");

  // Verify luxury branding and headline
  await expect(page.locator("h1")).toContainText("Engineered Luxury Financing");

  // Interact with Lead Funnel Step 1
  await page.selectOption("select[name='loanPurpose']", "Purchase");
  await page.fill("input[name='purchasePrice']", "1250000");
  await page.fill("input[name='downPayment']", "250000");
  await page.click("button:has-text('Continue to Contact Info')");

  // Fill Step 2 Contact Details
  await page.fill("input[name='firstName']", "Jonathan");
  await page.fill("input[name='lastName']", "Vanderbilt");
  await page.fill("input[name='email']", "jonathan@vanderbilt-holdings.com");
  await page.fill("input[name='phone']", "3105550144");
  await page.fill("input[name='propertyZip']", "90210");

  // Submit Form
  await page.click("button:has-text('Get My Free Quote')");

  // Assert successful redirection to thank you page
  await expect(page).toHaveURL(/\/thank-you/);
  await expect(page.locator("h1")).toContainText("Quote Request Received");
});