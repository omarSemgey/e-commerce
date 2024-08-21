<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateItemRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'nullable|string|max:255|min:3',
            'description' => 'nullable|string|max:255|min:5',
            'content' => 'nullable|file|image|mimes:png,jpg,jpeg|max:1000|mimetypes:image/png,/image/jpg,image/jpeg',
            'count' => 'nullable|integer|min:1|max:9999',
            'price' => 'nullable|integer|min:1|max:9999',
            'company_id' => 'nullable|integer'
        ];
    }
}
