# FSPQMGHR

# finance

1. bp/cp/br/cr
2. jv-A Journal Voucher is an accounting entry used to record transactions that do not involve direct cash or bank movement.
3. bill passing with rcia Rate, Calculation, Interest, Adjustment--> po-puchase order of goods --> grn-good receipt note 
--> tax calculation then bill is passed
without rcia --> direct passed like electricty bill

# store

1. Item Master --> The catalog of all items/materials your company uses (raw materials, finished goods, consumables, spares, etc.).
Each item has a unique code/ID and descriptive details.

2. HSN Master --> HSN = Harmonized System of Nomenclature (used under GST in India and also globally for customs).
📌 Purpose: When you sell/purchase an item, the system automatically picks the correct tax rate based on its HSN from this master.
It classifies goods into standardized codes for taxation and reporting.

3. Unit Master
Defines the Units of Measure (UOM) in which items are stored, purchased, and issued.
Example:
Kilogram (Kg)
Liter (Ltr)
Piece (Nos)
Meter (Mtr)

4. What is Task Master?
A Task Master is the definition or catalog of standard tasks/activities that can be used repeatedly across different operations, projects, or work orders in ERP.

5. purchase with and without po

6. stock verification

6. Gate Inward
- Gate Inward is the process of receiving materials/items into the factory/store through the main gate.
- It ensures that all incoming goods are checked, verified, and recorded before entering the premises.

7. Gate Outward
Gate Outward is the process of releasing materials/items from the factory/store through the main gate.
Can be for:
Finished goods sent to customers
Raw materials sent to another site
Scrap or waste disposal

8. Stock verifcation
Stock Verification (or Physical Stock Verification / Stock Audit) is the process of comparing the actual physical inventory in the store with the stock recorded in ERP.
Conducted at fixed intervals (monthly, quarterly, or yearly).
Checks all items in the store.


# Quality

1. calibration record
Calibration Record is a documented history of checking, adjusting, and certifying measuring instruments or equipment to ensure they give accurate readings.

2. foundary defects

3. Instrument Master
Track Instruments: Know which instruments exist, their location, and status.
Calibration Management: Link with Calibration Records to ensure instruments are always accurate.
Maintenance Scheduling: Plan preventive maintenance to avoid downtime.

# maintenance

1. machine preventive maintenance
2. breakdown reason

# E-invoice implementation

🔹 1. Prerequisites
Mandatory fields in ERP as per the e-invoice schema:
Supplier GSTIN, Recipient GSTIN
Invoice number & date
Place of supply
HSN/SAC codes of items
Taxable value, CGST, SGST, IGST
Unit of measure, quantity, rate

2. Prepare Invoice Data in ERP
ERP generates a JSON payload in the format required by the IRP API.

3. Send Invoice Data to IRP (Government API)
ERP sends a POST request to the IRP API endpoint with the JSON payload.
IRP performs validation:
GSTIN validation
Invoice number duplication check
HSN/tax details validation
Other schema rules

4. IRP Processes & Returns Signed Invoice
If everything is valid, IRP:
Generates a unique Invoice Reference Number (IRN).
Generates a QR code (for verification).
Digitally signs the invoice.

7. Error Handling
If IRP rejects invoice:
ERP receives error code and description.
Common errors: duplicate invoice number, invalid GSTIN, missing HSN.
ERP allows user to correct and resend.

✅ Summary of the Flow
ERP prepares invoice → JSON payload.
ERP sends invoice to IRP API.
IRP validates → generates IRN + QR code + digital signature.
ERP stores IRN & QR → invoice is ready for printing/emailing.
GST system automatically gets the invoice details.