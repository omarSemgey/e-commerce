<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreItemRequest extends FormRequest
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
            'title' => 'required|string|max:255|min:3',
            'description' => 'required|string|max:255|min:5',
            'content' => 'required|file|image|mimes:png,jpg,jpeg|max:1000|mimetypes:image/png,/image/jpg,image/jpeg',
            'count' => 'required|integer|min:1|max:9999',
            'price' => 'required|integer|min:1|max:9999',
            'category_id' => 'required|integer',
            'company_id' => 'required|integer'
        ];
    }
}
