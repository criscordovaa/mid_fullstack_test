<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class TestUser extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $user = new User();
        $user->fill([
            "name" => "Admin User",
            "email" => "admin.user@root.com",
            "password" => bcrypt("secret")
        ]);
        $user->save();
    }
}
