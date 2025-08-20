import { PetNameResponse } from "@/app/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const image = formData.get("image") as File;
    const recaptchaToken = formData.get("recaptchaToken") as string;

    if (!image || image.size === 0) {
      return NextResponse.json(
        {
          success: false,
          names: [],
          analysis: "",
          message: "",
          error: "No image provided",
        } as PetNameResponse,
        { status: 400 }
      );
    }

    // Simple validation
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      return NextResponse.json(
        {
          success: false,
          names: [],
          analysis: "",
          message: "",
          error: "Invalid file type",
        } as PetNameResponse,
        { status: 400 }
      );
    }

    // Forward request to your backend
    const backendUrl = process.env.BACKEND_URL || "http://localhost:3001";
    const backendFormData = new FormData();
    backendFormData.append("image", image, image.name);
    if (recaptchaToken) {
      backendFormData.append("recaptchaToken", recaptchaToken);
    }

    const response = await fetch(`${backendUrl}/api/generate-name`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      throw new Error(`Backend request failed: ${response.status}`);
    }

    const result: PetNameResponse = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error calling backend:", error);
    return NextResponse.json(
      {
        success: false,
        names: [],
        analysis: "",
        message: "",
        error: "Failed to generate names",
      } as PetNameResponse,
      { status: 500 }
    );
  }
}
