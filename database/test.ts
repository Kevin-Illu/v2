SQLite format 3   @     6                                                               6 .f�
m 	 >�.
u	
2                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     �0''�tableglobal_configglobal_configCREATE TABLE global_config (
            key TEXT PRIMARY KEY,
            value TEXT NULL,
            description TEXT NULL
          )9M' indexsqlite_autoindex_global_config_1global_config       ��tablestepsstepsCREATE TABLE steps (
            id INTEGER NOT NULL,
            todo_id INTEGER NOT NULL,
            description TEXT,
            completed BOOLEAN NOT NULL DEFAULT 0,
            archived BOOLEAN NOT NULL DEFAULT 0,
            name TEXT NOT NULL, parent_step_id INTEGER NULL,
          FOREIGN KEY("todo_id") REFERENCES "todos"("id"),
          PRIMARY KEY("id" AUTOINCREMENT)
        )��tabletodostodosCREATE TABLE todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            user_id INTEGER NOT NULL,
            state_id INTEGER NOT NULL,
            name TEXT NOT NULL,
            description TEXT NULL,
            archived BOOLEAN NOT NULL DEFAULT 0,
            created_date DATETIME NOT NULL,
            steps_id INTEGER NULL,
            parent_step_id ITEGER NULL,
          FOREIGN KEY (user_id) REFERENCES user(id),
          FOREIGN KEY (state_id) REFERENCES states(id)
        )�;�QtablestatesstatesCREATE TABLE states (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name TEXT NOT NULL,
            description TEXT NOT NULL
          )P++Ytablesqlite_sequencesqlite_sequenceCREATE TABLE sqlite_sequence(name,seq)�?�atableuseruserCREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL
          )   + ����jL.����z\>!����sV9�����nQ4�����eG*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              + 3kevinexample@example.com* 1kevinexampl@example.com) 3kevinexample@example.com( 3kevinexample@example.com' 1kevinexampl@example.com& 3kevinexample@example.com% 1kevinexampl@example.com$ 3kevinexample@example.com# 1kevinexampl@example.com" 3kevinexample@example.com! 1kevinexampl@example.com  1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 1kevinexampl@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com
 3kevinexample@example.com	 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com 3kevinexample@example.com   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              user+
states6   6	 ���~Z;���vU>����yR/����jF'����bA*
�
�
�
|
e
>
	�	�	�	�	y	V	2	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               6 -CompletedThings are done!"5 9DeferredPut off until tomorrow!4 7CanceledNever going to happen%3 AWaitingWaiting for something else2 %To-doThings to do1 7ActiveThings are happening!0 -CompletedThings are done!"/ 9DeferredPut off until tomorrow!. 7CanceledNever going to happen%- AWaitingWaiting for something else, %To-doThings to do+ 7ActiveThings are happening!* -CompletedThings are done!") 9DeferredPut off until tomorrow!( 7CanceledNever going to happen%' AWaitingWaiting for something else& %To-doThings to do% 7ActiveThings are happening!$ -CompletedThings are done!"# 9DeferredPut off until tomorrow!" 7CanceledNever going to happen%! AWaitingWaiting for something else  %To-doThings to do 7ActiveThings are happening! -CompletedThings are done!" 9DeferredPut off until tomorrow! 7CanceledNever going to happen% AWaitingWaiting for something else %To-doThings to do 7ActiveThings are happening! -CompletedThings are done!" 9DeferredPut off until tomorrow! 7CanceledNever going to happen% AWaitingWaiting for something else %To-doThings to do 7ActiveThings are happening! -CompletedThings are done!" 9DeferredPut off until tomorrow! 7CanceledNever going to happen% AWaitingWaiting for something else %To-doThings to do 7ActiveThings are happening! -CompletedThings are done!" 9DeferredPut off until tomorrow!
 7CanceledNever going to happen%	 AWaitingWaiting for something else %To-doThings to do 7ActiveThings are happening! -CompletedThings are done!" 9DeferredPut off until tomorrow! 7CanceledNever going to happen% AWaitingWaiting for something else %To-doThings to do 7ActiveThings are happening!                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    )%=main_user_id1id del usuario principalS#�initializedtrueindica si la aplicacion se inicializo con los datos por default
   � ��                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    %main_user_id#	initialized