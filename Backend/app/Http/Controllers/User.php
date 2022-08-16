<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class User extends Controller
{
    //
    public function me(): Response
    {
        try {
            $response = Auth::user();
            return new Response($response);
        } catch (Exception $e) {
            return new Response(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY, $e->getLine());
        }
    }
}
