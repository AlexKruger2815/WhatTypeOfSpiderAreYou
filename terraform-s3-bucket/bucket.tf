module "s3-bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "4.1.2"
  bucket = "spider-type-aws-ftstates"
}