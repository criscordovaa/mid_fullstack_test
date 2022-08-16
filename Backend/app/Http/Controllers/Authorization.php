<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use \Exception;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class Authorization extends Controller
{
    //
    public function login(LoginRequest $request): Response
    {
        try {
            $credentials = $request->only(["email", "password"]);
            if (Auth::attempt($credentials)) {
                $prepareToken = Auth::user()->createToken(config("app.name"));
                $response["token"] = $prepareToken->accessToken;
                $response["user"] = Auth::user();
                $prepareToken->token->save();
                $code = ResponseAlias::HTTP_OK;
            } else {
                $response["message"] = "Email or password are not match, please try again.";
                $code = ResponseAlias::HTTP_UNAUTHORIZED;
            }
        } catch (Exception $e) {
            abort(ResponseAlias::HTTP_UNPROCESSABLE_ENTITY, $e->getMessage());
        }
        return new Response(
            $response,
            $code
        );
    }
}
