
# Check if jscodeshift is available
command -v jscodeshift >/dev/null 2>&1 || { echo "Tests require jscodeshift to be installed globally. Run npm install -g jscodeshift before running the tests. Aborting." >&2; exit 1; }

declare -a transformationsToBeTested=("assert" "chaiAssert" "chaiExpect" "expectInstanceOf" "expectToBeUndefined")

# Run the transformations
for transformation in "${transformationsToBeTested[@]}"
do
   echo "Preparing test for transformation: $transformation"
   inputFile="__tests__/fixtures/$transformation/input.js"
   echo $inputFile
   declare inputFileBackup="__tests__/fixtures/$transformation/input.backup.js"
   cp $inputFile $inputFileBackup
   jscodeshift -t "transformations/$transformation.js" $inputFile
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
