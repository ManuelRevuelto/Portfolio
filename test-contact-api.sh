#!/bin/bash

echo "=========================================="
echo "Testing Contact API with reCAPTCHA"
echo "=========================================="

API_URL="http://localhost:4200/api/contact"

# Test 1: Without reCAPTCHA token (should succeed in dev mode)
echo -e "\n 1.-  Test WITHOUT reCAPTCHA token (should succeed):"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 1",
    "email": "test1@example.com",
    "message": "Test message without captcha"
  }' | jq '.' || echo "Response not JSON"

# Test 2: With invalid reCAPTCHA token
echo -e "\n\n 2.-  Test with INVALID reCAPTCHA token (should fail):"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 2",
    "email": "test2@example.com",
    "message": "Test message with invalid token",
    "recaptchaToken": "invalid_token_xyz_123"
  }' | jq '.' || echo "Response not JSON"

# Test 3: Missing required fields
echo -e "\n\n 3.-  Test with MISSING fields (should fail):"
curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User 3"
  }' | jq '.' || echo "Response not JSON"

# Test 4: Check /api/config endpoint
echo -e "\n\n 4.-  Check /api/config (should return reCAPTCHA site key):"
curl -s -X GET "http://localhost:4200/api/config" | jq '.'

echo -e "\n\n=========================================="
echo "Tests completed!"
echo "=========================================="
