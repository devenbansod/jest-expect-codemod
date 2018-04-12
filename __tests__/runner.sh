declare -a transformationsToBeTested=("assert" "chaiAssert" "chaiExpect" "expectInstanceOf" "expectToBeUndefined")

# Run the transformations
for transformation in "${transformationsToBeTested[@]}"
do
   echo "Preparing test for transformation: $transformation"
   inputFile="__tests__/fixtures/$transformation/input.js"
   echo $inputFile
   declare inputFileBackup="__tests__/fixtures/$transformation/input.backup.js"
   cp $inputFile $inputFileBackup
   yarn jscodeshift -t "transformations/$transformation.js" $inputFile
done

# Run the tests
npm run jest

# Clean-up
for transformation in "${transformationsToBeTested[@]}"
do
   echo "Cleaning up test backups for transformation: $transformation"
   inputFile="__tests__/fixtures/$transformation/input.js"
   inputFileBackup="__tests__/fixtures/$transformation/input.backup.js"
   cp $inputFileBackup $inputFile
   rm $inputFileBackup
done
