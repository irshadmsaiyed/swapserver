-- CreateTable
CREATE TABLE "subject" (
    "id" SERIAL NOT NULL,
    "subject_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_teacher" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "classroom_id" INTEGER NOT NULL,
    "teacher_id" INTEGER NOT NULL,
    "subject_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subject_teacher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "session1_start" TIMESTAMP(3) NOT NULL,
    "session1_end" TIMESTAMP(3) NOT NULL,
    "session2_start" TIMESTAMP(3) NOT NULL,
    "session2_end" TIMESTAMP(3) NOT NULL,
    "diwali_start" TIMESTAMP(3) NOT NULL,
    "diwali_end" TIMESTAMP(3) NOT NULL,
    "summer_start" TIMESTAMP(3) NOT NULL,
    "summer_end" TIMESTAMP(3) NOT NULL,
    "other_start" TIMESTAMP(3),
    "other_end" TIMESTAMP(3),
    "other_details" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "working_days" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "educational_days" INTEGER NOT NULL,
    "teaching_days" INTEGER NOT NULL,
    "nonteaching_days" INTEGER NOT NULL,
    "service_days" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "working_days_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "taluka" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "pin" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "mobile_no1" TEXT NOT NULL,
    "mobile_no2" TEXT,
    "whatsapp_no" TEXT NOT NULL,
    "email" TEXT,
    "appointment_nature" TEXT NOT NULL,
    "experience_years" INTEGER NOT NULL,
    "joining_date" TIMESTAMP(3) NOT NULL,
    "educational_qualification" TEXT NOT NULL,
    "professional_qualification" TEXT NOT NULL,
    "driving_licence" TEXT,
    "appointed_section" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "appointed_subject" TEXT NOT NULL,
    "main_subject1" TEXT NOT NULL,
    "main_subject2" TEXT NOT NULL,
    "subsidiary_subject1" TEXT,
    "subsidiary_subject2" TEXT,
    "subsidiary_subject3" TEXT,
    "monthly_salary" INTEGER NOT NULL,
    "sanctioned_leave" INTEGER NOT NULL,
    "aadhar_no" TEXT,
    "pan_no" TEXT,
    "bank_account" TEXT,
    "bank_name" TEXT,
    "branch_name" TEXT,
    "ifsc_code" TEXT,
    "recruited_by" TEXT,
    "profile_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classroom" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "teacher_id" INTEGER NOT NULL,

    CONSTRAINT "classroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employee_leave" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "leave_month" INTEGER NOT NULL,
    "leave_date" TIMESTAMP(3) NOT NULL,
    "leave_type" TEXT NOT NULL,
    "leave_reason" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "employee_id" INTEGER NOT NULL,

    CONSTRAINT "employee_leave_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicle" (
    "id" SERIAL NOT NULL,
    "registration_no" TEXT NOT NULL,
    "registration_validity" TIMESTAMP(3) NOT NULL,
    "insurance_policyno" TEXT NOT NULL,
    "insurance_validity" TIMESTAMP(3) NOT NULL,
    "puc_certino" TEXT NOT NULL,
    "puc_validity" TIMESTAMP(3) NOT NULL,
    "vehicle_image" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "driver_id" INTEGER NOT NULL,

    CONSTRAINT "vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "root" (
    "id" SERIAL NOT NULL,
    "root_name" TEXT NOT NULL,
    "root_rent" INTEGER NOT NULL,
    "pickup_point" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "vehicle_id" INTEGER NOT NULL,

    CONSTRAINT "root_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "addmission_date" TIMESTAMP(3) NOT NULL,
    "school_id" INTEGER NOT NULL,
    "standard" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "mother_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "taluka" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pin" INTEGER NOT NULL,
    "habitation" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "birth_place" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "religion" TEXT NOT NULL,
    "caste" TEXT NOT NULL,
    "parent_mobileno1" TEXT NOT NULL,
    "live_withguardian" BOOLEAN NOT NULL,
    "is_orphan" BOOLEAN NOT NULL,
    "cwsn_status" TEXT NOT NULL,
    "bus_rootno" INTEGER NOT NULL,
    "is_repeater" BOOLEAN NOT NULL,
    "livein_hostel" BOOLEAN NOT NULL,
    "rte_addmission" BOOLEAN NOT NULL,
    "roll_no" INTEGER,
    "gr_no" INTEGER,
    "aadhar_diseno" TEXT,
    "aadhar_cardno" TEXT,
    "birth_taluko" TEXT,
    "birth_district" TEXT,
    "birth_state" TEXT,
    "grandfather_name" TEXT,
    "father_aadharno" TEXT,
    "mother_aadharno" TEXT,
    "parent_income" INTEGER,
    "parent_occupation" TEXT,
    "parent_mobileno2" TEXT,
    "parent_whatsappno" TEXT,
    "parent_email" TEXT,
    "ration_cardno" TEXT,
    "isbpl_rationcard" BOOLEAN,
    "bank_accountno" TEXT,
    "bank_name" TEXT,
    "branch_name" TEXT,
    "ifsc_code" TEXT,
    "preschool_name" TEXT,
    "preschool_address" TEXT,
    "preschool_village" TEXT,
    "preschool_taluka" TEXT,
    "preschool_district" TEXT,
    "preschool_state" TEXT,
    "preschool_result" DOUBLE PRECISION,
    "school_leftdate" TIMESTAMP(3),
    "school_leftreason" TEXT,
    "payable_schoolfee" INTEGER,
    "payable_busfee" INTEGER,
    "payable_hostelfee" INTEGER,
    "paid_schoolfee" INTEGER,
    "paid_busfee" INTEGER,
    "paid_hostelfee" INTEGER,
    "unpaid_schoolfee" INTEGER,
    "unpaid_busfee" INTEGER,
    "unpaid_hostelfee" INTEGER,
    "total_payablefee" INTEGER,
    "total_paidfee" INTEGER,
    "total_unpaidfee" INTEGER,
    "feedue_date" TIMESTAMP(3),
    "mentor_id" INTEGER,
    "guardian_firstname" TEXT,
    "guardian_middlename" TEXT,
    "guardian_lastname" TEXT,
    "guardian_address" TEXT,
    "guardian_village" TEXT,
    "guardian_taluka" TEXT,
    "guardian_district" TEXT,
    "guardian_state" TEXT,
    "guardian_pin" INTEGER,
    "guardian_mobileno1" TEXT,
    "guardian_mobileno2" TEXT,
    "guardian_whatsappno" TEXT,
    "guardian_landlineno" TEXT,
    "guardian_relationship" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profile_image" TEXT,
    "username" TEXT,
    "password" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "standard" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "addmission_fee" INTEGER NOT NULL,
    "enrollment_fee" INTEGER NOT NULL,
    "semester1_fee" INTEGER NOT NULL,
    "semester2_fee" INTEGER NOT NULL,
    "semester3_fee" INTEGER NOT NULL,
    "semester4_fee" INTEGER NOT NULL,
    "tution_fee" INTEGER NOT NULL,
    "laboratory_fee" INTEGER NOT NULL,
    "library_fee" INTEGER NOT NULL,
    "computer_fee" INTEGER NOT NULL,
    "craft_fee" INTEGER NOT NULL,
    "amenity_fee" INTEGER NOT NULL,
    "diary_fee" INTEGER NOT NULL,
    "hostel_fee" INTEGER NOT NULL,
    "annual_fee" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fee_transaction" (
    "id" SERIAL NOT NULL,
    "educational_year" TEXT NOT NULL,
    "school_id" INTEGER NOT NULL,
    "student_id" INTEGER NOT NULL,
    "fee_type" TEXT NOT NULL,
    "fee_amount" INTEGER NOT NULL,
    "fee_paiddate" TIMESTAMP(3) NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "payment_mode" TEXT NOT NULL,
    "upi_refno" TEXT,
    "check_no" TEXT,
    "check_date" TIMESTAMP(3),
    "bank_name" TEXT,
    "branch_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "fee_transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "school" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "lowest_class" TEXT NOT NULL,
    "highest_class" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "management" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "village" TEXT NOT NULL,
    "taluka" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "pin" INTEGER NOT NULL,
    "habitation" TEXT NOT NULL,
    "latitude" TEXT,
    "longitude" TEXT,
    "email" TEXT NOT NULL,
    "landline_no" TEXT,
    "principal_name" TEXT NOT NULL,
    "principal_contactno" TEXT NOT NULL,
    "admin_name" TEXT NOT NULL,
    "admin_contactno" TEXT NOT NULL,
    "establish_date" TIMESTAMP(3) NOT NULL,
    "primary_recognitiondate" TIMESTAMP(3),
    "upprimary_recognitiondate" TIMESTAMP(3),
    "secondary_recognitiondate" TIMESTAMP(3),
    "hsecondary_recognitiondate" TIMESTAMP(3),
    "affiliation_board" TEXT,
    "ssc_indexno" TEXT,
    "hsc_indexno" TEXT,
    "udise_code" TEXT,
    "bank_accountno" TEXT NOT NULL,
    "account_holdername" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "ifsc_code" TEXT NOT NULL,
    "crc_name" TEXT,
    "qdc_name" TEXT,
    "svs_name" TEXT,
    "panchayat_name" TEXT,
    "assemblyarea_name" TEXT,
    "parliamentarea_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "school_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "demo" (
    "id" SERIAL NOT NULL,
    "section" TEXT[],

    CONSTRAINT "demo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subject_id_key" ON "subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_teacher_id_key" ON "subject_teacher"("id");

-- CreateIndex
CREATE UNIQUE INDEX "session_id_key" ON "session"("id");

-- CreateIndex
CREATE UNIQUE INDEX "working_days_id_key" ON "working_days"("id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_id_key" ON "employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "classroom_id_key" ON "classroom"("id");

-- CreateIndex
CREATE UNIQUE INDEX "classroom_teacher_id_key" ON "classroom"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_leave_id_key" ON "employee_leave"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_id_key" ON "vehicle"("id");

-- CreateIndex
CREATE UNIQUE INDEX "vehicle_driver_id_key" ON "vehicle"("driver_id");

-- CreateIndex
CREATE UNIQUE INDEX "root_id_key" ON "root"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_id_key" ON "student"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fee_id_key" ON "fee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fee_transaction_id_key" ON "fee_transaction"("id");

-- CreateIndex
CREATE UNIQUE INDEX "school_id_key" ON "school"("id");

-- CreateIndex
CREATE UNIQUE INDEX "demo_id_key" ON "demo"("id");

-- AddForeignKey
ALTER TABLE "subject_teacher" ADD CONSTRAINT "subject_teacher_classroom_id_fkey" FOREIGN KEY ("classroom_id") REFERENCES "classroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher" ADD CONSTRAINT "subject_teacher_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subject_teacher" ADD CONSTRAINT "subject_teacher_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classroom" ADD CONSTRAINT "classroom_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_leave" ADD CONSTRAINT "employee_leave_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vehicle" ADD CONSTRAINT "vehicle_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "root" ADD CONSTRAINT "root_vehicle_id_fkey" FOREIGN KEY ("vehicle_id") REFERENCES "vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fee_transaction" ADD CONSTRAINT "fee_transaction_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
